<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();

// });

Route::controller(AuthController::class)->group(function () {
    Route::post('auth/login', 'login');
    Route::post('auth/signup', 'register');
    Route::post('auth/logout', 'logout');
    Route::post('auth/reset-password', 'resetPassword');
});

Route::group(['middleware' => ['auth:api']], function () {
    Route::get('/jobs', [Controller::class, 'jobs'])->name('jobs'); //user and recruiter can see job list
    Route::post('/jobs/{job_id}/apply', [Controller::class, 'userApplyJob'])->name('jobs-apply'); //user can apply to any job
    Route::get('/jobs/applied', [Controller::class, 'getJobApplied'])->name('jobs-applied'); //user can see all their applied jobs
    Route::post('/jobs', [Controller::class, 'postJob'])->name('post-job'); //Recruiter can post a job
    Route::get('/jobs/{job_id}', [Controller::class, 'userApplied'])->name('user-applied'); //Recruiter can fetch users applied to a job
    Route::get('/admin/users', [Controller::class, 'userList'])->name('admin-users'); //admin can see thre list of users
    Route::get('/admin/jobs', [Controller::class, 'activeJob'])->name('admin-jobs'); //admin can see thre list of active Jobs
    Route::get('admin/jobs/{job_id}', [Controller::class, 'AdminFetchUserList'])->name('admin-jobs'); //admin can fetch users applied to a job
    Route::delete('admin/users/{id}', [Controller::class, 'adminDeleteUser'])->name('admin-users-delete'); //admin can delete to any particular user
    Route::delete('admin/jobs/{id}', [Controller::class, 'adminDeleteJob'])->name('admin-job-delete'); //admin can delete to any particular user
});
