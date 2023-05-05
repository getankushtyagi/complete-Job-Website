<?php

namespace App\Http\Controllers;

use App\Mail\ResetPasswordMail;
use App\Models\ResetPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'resetPassword', 'resetPasswordLoad', 'resetPasswordCal']]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Please Enter Correct Email ot Password',
            ], 401);
        }

        $user = Auth::user();
        // dd($user);
        if ($user['deleted_at'] != null) {
            return response()->json([
                'status' => 'failed',
                'message' => 'user not exist'
            ]);
        }
        return response()->json([
            'status' => 'success',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function register(Request $request)
    {
        try {
            //code...
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6',
            ]);

            if ($request->role == 0) {
                return response()->json(['status' => "401", 'result' => 'failed', 'message' => "role not define"]);
            }
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'ulid' => Str::ulid(),
                'role' =>  $request->role,
                'created_at' => Carbon::now()->toDateTime()
            ]);

            $token = Auth::login($user);
            return response()->json([
                'status' => 'success',
                'message' => 'User created successfully',
                'user' => $user,
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ]);
        } catch (\Exception $e) {
            // dd($e);
            Log::channel('joblog')->error(
                'register' . date("Y-m-d H:i:s"),
                ['message' => $e->getMessage(), 'trace' => $e->getTraceAsString()]
            );
        }
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function resetPassword(Request $request)
    {
        try {
            //code...
            $email=$request['email'];
            $user = User::where('email', $email)->get();
            // dd($user);
            if (count($user) > 0) {
                $token = Str::random(40);
                $domain = URL::to('/');
                $url = $domain . '/reset-password?token=' . $token;

                $data = [
                    'url' => $url,
                    'title' => 'Reset Password',
                    'body' => "please click on below link to reset your password"
                ];

                Mail::to($email)->send(new ResetPasswordMail($data));
                ResetPassword::updateOrCreate(['email' => $email], [
                    'email' => $email,
                    'token' => $token,
                    'created_at' => Carbon::now()->toDateTime(),
                ]);
                return response()->json(['status' => 200, 'result' => true, 'message' => 'check your mail to reset password']);
            } else {
                return response()->json(['status' => 500, 'result' => false, 'message' => 'user not found']);
            }
        } catch (\Exception $e) {
            // dd($e);
            Log::channel('joblog')->error(
                'User register' . date("Y-m-d H:i:s"),
                ['message' => $e->getMessage(), 'trace' => $e->getTraceAsString()]
            );
        }
    }

    public function resetPasswordLoad(Request $request)
    {
        try {
            $resetpassword = ResetPassword::where('token', $request['token'])->get();
            // dd( $resetpassword[0]['email']);
            if (isset($request['token'])) {
                //    dd('check');
                $user = User::where('email', $resetpassword[0]['email'])->get();
                return view('resetpasswordload', compact('user'));
            } else {
                return view('404');
            }
        } catch (\Exception $e) {
            // dd($e);
            Log::channel('joblog')->error(
                'reset password' . date("Y-m-d H:i:s"),
                ['message' => $e->getMessage(), 'trace' => $e->getTraceAsString()]
            );
        }
    }
    public function resetPasswordCal(Request $request)
    {
        try {
            $request->validate([
                'password' => 'required|string|min:6|confirmed'
            ]);
            $user = User::find($request['id']);
            $user->password = Hash::make($request['password']);
            $user->save();

            ResetPassword::where('email', $user['email'])->delete();
            return "<h1>Your password is reset </h1>";
        } catch (\Exception $e) {
            // dd($e);
            Log::channel('joblog')->error(
                'reset password' . date("Y-m-d H:i:s"),
                ['message' => $e->getMessage(), 'trace' => $e->getTraceAsString()]
            );
        }
    }
}
