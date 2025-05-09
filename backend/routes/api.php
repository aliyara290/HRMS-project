<?php

use App\Http\Controllers\V1\LeaveAndRecoveryController;
use App\Http\Controllers\V1\CareerController;
use App\Http\Controllers\V1\DepartmentController;
use App\Http\Controllers\V1\EmployeeController;
use Illuminate\Http\Request;
use App\Http\Controllers\V1\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\V1\JobController;
use App\Mail\UserMail;
use App\Models\Career;
use Illuminate\Support\Facades\Mail;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

});
Route::prefix('v1')->group(function () {
    Route::apiResource('employees', EmployeeController::class);
    Route::apiResource('users', UserController::class);
    Route::apiResource('departments', DepartmentController::class);
    Route::apiResource('jobs', JobController::class);
    Route::apiResource('careers', CareerController::class);
    Route::apiResource('leaveRequest', LeaveAndRecoveryController::class);
    Route::get('pendingLeaves', [LeaveAndRecoveryController::class, 'pendingLeaves']);
});


Route::get('/send', function() {
    Mail::to('ali.yara.cc@gmail.com')->send(new UserMail("ali"));
    return 'sent successfully';
});