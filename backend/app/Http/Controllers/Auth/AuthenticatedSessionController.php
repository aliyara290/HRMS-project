<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\V1\LeaveAndRecoveryController;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        $request->authenticate();
        $request->session()->regenerate();

        $employee = Employee::where('user_id', 21);

        if ($employee) {
            $leaveAndRecoveryController = new LeaveAndRecoveryController();
            $leaveBalance = $leaveAndRecoveryController->calculateLeaveBalance($employee);

            $employee->total_leave_days = $leaveBalance;
            $employee->save();

            return response()->json([
                "message" => "User authenticated successfully YEEEES"
            ], 200);
        }

        return response()->json(["message" => "User authenticated successfully", "user" => $employee], 200);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(["message" => "User logged out successfully"], 200);
    }
}
