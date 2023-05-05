<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Job;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;


class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function jobs()
    {
        try {
            $user_dertail = Auth::user();
            // dd($user_dertail['role']);
            if ($user_dertail['role'] == 1) { //user
                $job_list = Job::select('id', 'job_title', 'job_description')->where('status', 0)->get();
                return response()->json(['status' => 200, "result" => "success", "data" => $job_list]);
            } else if ($user_dertail['role'] == 2) { //recruiter
                $job_list = Job::select('id', 'job_title', 'job_description')->where('status', 0)->where('recruiter_id', $user_dertail['id'])->get();
                return response()->json(['status' => 200, "result" => "success", "data" => $job_list]);
            } else { //admin
                $job_list = Job::select('id', 'job_title', 'job_description')->where('status', 0)->get();
                return response()->json(['status' => 200, "result" => "success", "data" => $job_list]);
            }
        } catch (\Exception $e) {
            // dd($e);
            Log::channel('joblog')->error(
                'job fetch list' . date("Y-m-d H:i:s"),
                ['message' => $e->getMessage(), 'trace' => $e->getTraceAsString()]
            );
            // Log::info('job fetch list', ['message' => $e->getMessage()]);
        }
    }

    public function userApplyJob($jobid)
    {
        try {
            $user_detail = Auth::user();
            $job_detail=Job::select('*')->Where('id',$jobid)->whereNull('deleted_at')->first();
            // dd($job_detail);
            if($job_detail == null){
                return response()->json(['status' => 500, 'result' => "failed", "message" => "Job does not exist"]);
            }
            if($user_detail['id']==$job_detail['recruiter_id']){
                return response()->json(['status' => 500, 'result' => "failed", "message" => "You are the publisher of this job you cannot apply to this job"]);
            }
            $application_id = Application::insertGetId([
                "candidate_id" => $user_detail['id'],
                "job_id" => $jobid,
                "created_at" => Carbon::now()->toDateTime()
            ]);
            if ($application_id) {
                return response()->json(['status' => 200, 'result' => "success", "message" => "You have applied successfully"]);
            } else {
                return response()->json(['status' => 500, 'result' => "failed", "message" => "Something went wrong"]);
            }
        } catch (\Exception $e) {
            // dd($e);
            Log::channel('joblog')->error(
                'user Job Apply' . date("Y-m-d H:i:s"),
                ['message' => $e->getMessage(), 'trace' => $e->getTraceAsString()]
            );
            // Log::info('user Job Apply', ['message' => $e->getMessage()]);
        }
    }
    public function getJobApplied()
    {
        try {
            $user_dertail = Auth::user();
            $job_list = Application::select('id', 'candidate_id', 'job_id')
                ->with(['jobs' => function ($q) {
                    $q->select('id', 'job_title', 'job_description');
                }])
                ->where('candidate_id', $user_dertail['id'])->get();

            if ($job_list) {
                return response()->json(['status' => 200, 'result' => "All Job List Fetch Successfully", "data" => $job_list]);
            } else {
                return response()->json(['status' => 500, 'result' => "failed", "message" => "Something went wrong"]);
            }
        } catch (\Exception $e) {
            // dd($e);
            Log::channel('joblog')->error(
                'Failed to apply Job' . date("Y-m-d H:i:s"),
                ['message' => $e->getMessage(), 'trace' => $e->getTraceAsString()]
            );
            // Log::info('user Job Apply', ['message' => $e->getMessage()]);
        }
    }

    public function postJob(Request $request)
    {
        try {
            $user_dertail = Auth::user();
            $data = [
                'job_title' => $request->title,
                'job_description' => $request->description,
                'ulid' => Str::ulid(),
                'recruiter_id' => $user_dertail['id'],
                'created_at' => Carbon::now()->toDateTime()
            ];
            // dd($data);
            if ($user_dertail['role'] == 2 || $user_dertail['role'] == 0) {
                $insertjob = Job::insertGetId($data);
                return response()->json(['status' => 200, 'result' => "Success", "message" => "Job has been published"]);
            } else {
                return response()->json(['status' => 401, 'result' => "failed", "messaage" => "Unauthorize Access"]);
            }
        } catch (\Exception $e) {
            // dd($e);
            Log::channel('joblog')->error(
                'post job' . date("Y-m-d H:i:s"),
                ['message' => $e->getMessage(), 'trace' => $e->getTraceAsString()]
            );
            // Log::info('post job', ['message' => $e->getMessage()]);
        }
    }

    public function userApplied($job_id)
    {
        try {
            $user_dertail = Auth::user();
            if ($user_dertail['role'] == 0 || $user_dertail['role'] == 2) {
                $users = DB::table('applications')
                    ->join('users', 'users.id', '=', 'applications.candidate_id')
                    ->select('users.id', 'users.name', 'users.email', 'applications.id as application_id', 'applications.job_id')
                    ->where('applications.job_id', $job_id)
                    ->get();
                // return $users;
                if ($users) {
                    return response()->json(['status' => 200, 'result' => "User fetch Successfully", "data" => $users]);
                } else {
                    return response()->json(['status' => 500, 'result' => "failed", "message" => "Something went wrong"]);
                }
            } else {
                return response()->json(['status' => 401, 'result' => "failed", "messaage" => "Unauthorize Access"]);
            }
        } catch (\Exception $e) {
            // dd($e);
            Log::channel('joblog')->error(
                'total applied users' . date("Y-m-d H:i:s"),
                ['message' => $e->getMessage(), 'trace' => $e->getTraceAsString()]
            );
            // Log::info('total applied users', ['message' => $e->getMessage()]);
        }
    }

    public function userList()
    {
        try {
            $user_dertail = Auth::user();
            if ($user_dertail['role'] == 0) {
                $users_list = User::select('id', 'name', 'email')->where('status', 0)->where('role','!=',0)->get();
                if ($users_list) {
                    return response()->json(['status' => 200, 'result' => "User List Fetch Successfully", "data" => $users_list]);
                } else {
                    return response()->json(['status' => 500, 'result' => "failed", "message" => "Something went wrong"]);
                }
            } else {
                return response()->json(['status' => 401, 'result' => "failed", "messaage" => "Unauthorize Access"]);
            }
        } catch (\Exception $e) {
            // dd($e);
            Log::channel('joblog')->error(
                'total users' . date("Y-m-d H:i:s"),
                ['message' => $e->getMessage(), 'trace' => $e->getTraceAsString()]
            );
            // Log::info('total users', ['message' => $e->getMessage()]);
        }
    }
    public function activeJob()
    {
        try {
            $user_dertail = Auth::user();
            if ($user_dertail['role'] == 0) {
                $users_list = Job::select('id', 'job_title as Title', 'job_description as Description', 'recruiter_id as RecruiterID')->where('status', 0)->get();
                if ($users_list) {
                    return response()->json(['status' => 200, 'result' => "Job List Fetch Successfully", "data" => $users_list]);
                } else {
                    return response()->json(['status' => 500, 'result' => "failed", "message" => "Something went wrong"]);
                }
            } else {
                return response()->json(['status' => 401, 'result' => "failed", "messaage" => "Unauthorize Access"]);
            }
        } catch (\Exception $e) {
            // dd($e);
            Log::channel('joblog')->error(
                'total Active Jobs' . date("Y-m-d H:i:s"),
                ['message' => $e->getMessage(), 'trace' => $e->getTraceAsString()]
            );
            // Log::info('total Active Jobs', ['message' => $e->getMessage()]);
        }
    }

    public function AdminFetchUserList(Request $request)
    {
        try {
            $job_id = $request['job_id'];
            $user_dertail = Auth::user();
            if ($user_dertail['role'] == 0) {
                $users = DB::table('applications')
                    ->join('users', 'users.id', '=', 'applications.candidate_id')
                    ->select('users.id', 'users.name', 'users.email', 'applications.id as application_id', 'applications.job_id')
                    ->where('applications.job_id', $job_id)
                    ->get();
                // return $users;
                if ($users) {
                    return response()->json(['status' => 200, 'result' => "User fetch Successfully", "data" => $users]);
                } else {
                    return response()->json(['status' => 500, 'result' => "failed", "message" => "Something went wrong"]);
                }
            } else {
                return response()->json(['status' => 401, 'result' => "failed", "messaage" => "Unauthorize Access"]);
            }
        } catch (\Exception $e) {
            // dd($e);
            Log::channel('joblog')->error(
                'total applied users' . date("Y-m-d H:i:s"),
                ['message' => $e->getMessage(), 'trace' => $e->getTraceAsString()]
            );
            // Log::info('total applied users', ['message' => $e->getMessage()]);
        }
    }

    public function adminDeleteUser($user_id)
    {
        try {
            $user_dertail = Auth::user();
            if ($user_dertail['role'] == 0) {
                $user = User::find($user_id);
                // dd($user['id']);
                $deleteuser = [
                    'status' => 1,
                    'deleted_at' => Carbon::now()->toDateTime()
                ];
                $result = User::where('id', $user['id'])->update($deleteuser);
                // return $users;
                if ($result) {
                    return response()->json(['status' => 200, 'result' => "user delete successfully"]);
                } else {
                    return response()->json(['status' => 500, 'result' => "failed", "message" => "Something went wrong"]);
                }
            } else {
                return response()->json(['status' => 401, 'result' => "failed", "messaage" => "Unauthorize Access"]);
            }
        } catch (\Exception $e) {
            // dd($e);
            Log::channel('joblog')->error(
                'user delete' . date("Y-m-d H:i:s"),
                ['message' => $e->getMessage(), 'trace' => $e->getTraceAsString()]
            );
            // Log::info('user delete', ['message' => $e->getMessage()]);
        }
    }

    public function adminDeleteJob($job_id)
    {
        try {
            $user_dertail = Auth::user();
            if ($user_dertail['role'] == 0) {
                $job = Job::find($job_id);
                // dd($job['id']);
                $deletejob = [
                    'status' => 1,
                    'deleted_at' => Carbon::now()->toDateTime()
                ];
                $result = Job::where('id', $job['id'])->update($deletejob);
                // return $users;
                if ($result) {
                    return response()->json(['status' => 200, 'result' => "Job delete successfully"]);
                } else {
                    return response()->json(['status' => 500, 'result' => "failed", "message" => "Something went wrong"]);
                }
            } else {
                return response()->json(['status' => 401, 'result' => "failed", "messaage" => "Unauthorize Access"]);
            }
        } catch (\Exception $e) {
            // dd($e);
            Log::channel('joblog')->error(
                'user delete' . date("Y-m-d H:i:s"),
                ['message' => $e->getMessage(), 'trace' => $e->getTraceAsString()]
            );
            // Log::info('user delete', ['message' => $e->getMessage()]);
        }
    }
}
