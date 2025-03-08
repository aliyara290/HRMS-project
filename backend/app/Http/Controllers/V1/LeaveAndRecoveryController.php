<?php

namespace App\Http\Controllers\V1;

use App\Models\LeaveAndRecovery;
use App\Models\Employee;
use App\Http\Requests\V1\StoreLeaveAndRecoveryRequest;
use App\Http\Requests\V1\UpdateLeaveAndRecoveryRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\LeaveAndRecoveryCollection;
use App\Http\Resources\V1\LeaveAndRecoveryResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Carbon\Carbon;

class LeaveAndRecoveryController extends Controller
{
    const MAX_LEAVE_DAYS_PER_YEAR = 18;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();
        $leaves = LeaveAndRecovery::where('user_id', $userId)->orderBy('id', 'DESC')->get();
        return new LeaveAndRecoveryCollection($leaves);
    }

    /**
     * Fetch pending leaves for HR approval.
     */
    public function pendingLeaves()
    {
        try {
            $leaves = LeaveAndRecovery::leftJoin('users', 'leave_and_recoveries.user_id', '=', 'users.id')
                ->leftJoin('employees', 'leave_and_recoveries.user_id', '=', 'employees.user_id')
                ->leftJoin('jobs', 'employees.job_id', '=', 'jobs.id')
                ->where('leave_and_recoveries.status', "pending")
                ->select(
                    "leave_and_recoveries.*",
                    'users.name AS fullName',
                    'jobs.title AS position'
                )
                ->orderBy('leave_and_recoveries.id', 'DESC')
                ->get();
            return new LeaveAndRecoveryCollection($leaves);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while fetching pending leaves'], 500);
        }
    }

    /**
     * Store a new leave request.
     */
    public function store(StoreLeaveAndRecoveryRequest $request)
    {
        $userId = $request->userId;
        $totalDaysRequested = $request->totalDays;

        // Calculate remaining leave days
        $totalLeaveDaysUsed = LeaveAndRecovery::where('user_id', $userId)
            ->whereYear('start_date', now()->year)
            ->sum('total_days');

        $remainingLeaveDays = self::MAX_LEAVE_DAYS_PER_YEAR - $totalLeaveDaysUsed;

        // if ($totalDaysRequested > $remainingLeaveDays) {
        //     return response()->json(['response' => 'Not enough leave days remaining'], 400);
        // }

        // Create the leave request
        LeaveAndRecovery::create([
            "user_id" => $userId,
            "leave_type" => $request->leaveType,
            "start_date" => $request->startDate,
            "end_date" => $request->endDate,
            "return_date" => $request->returnDate,
            "total_days" => $totalDaysRequested,
            "reason" => $request->reason,
            "status" => "pending",
        ]);

        return response()->json(['response' => 'Leave request sent successfully'], 200);
    }


    public function calculateLeaveBalance($employee)
    {
        $startDate = $employee->contract_start_date();
        $currentDate = now();
        $monthsWorked = $startDate->diffInMonths($currentDate);
        $yearsWorked = $startDate->diffInYears($currentDate);

        if ($yearsWorked >= 1) {
            // Rule 1: 18 days + 0.5 days per additional year
            $leaveBalance = 18 + ($yearsWorked - 1) * 0.5;
            return $leaveBalance;
        } else {
            // Rule 2: 1.5 days per month worked
            $leaveBalance = $monthsWorked * 1.5;
            return $leaveBalance;
        }

    }

    /**
     * HR approves or rejects a leave request.
     */
    public function approveLeaveRequest(Request $request, $leaveId)
    {
        $request->validate([
            'action' => 'required|in:approve,reject',
        ]);

        $leaveRequest = LeaveAndRecovery::findOrFail($leaveId);

        if ($leaveRequest->status !== 'pending') {
            return response()->json(['message' => 'Leave request has already been processed'], 400);
        }

        if ($request->action === 'approve') {
            $leaveRequest->status = 'approved';
            $message = 'Leave request approved successfully';

            // Deduct leave balance
            $employee = Employee::where('user_id', $leaveRequest->user_id)->first();
            $employee->leave_balance -= $leaveRequest->total_days;
            $employee->save();
        } else {
            $leaveRequest->status = 'rejected';
            $message = 'Leave request rejected successfully';
        }

        $leaveRequest->save();

        return response()->json(['message' => $message], 200);
    }

    /**
     * Get leave balance (Employee).
     */
    public function getLeaveBalance()
    {
        $employee = Employee::where('user_id', Auth::id())->first();
        return response()->json(['leave_balance' => $employee->leave_balance], 200);
    }


    public function show(LeaveAndRecovery $leaveAndRecovery) {}


    public function update(UpdateLeaveAndRecoveryRequest $request, LeaveAndRecovery $leaveAndRecovery)
    {
        //
    }


    public function destroy(LeaveAndRecovery $leaveAndRecovery)
    {
        //
    }
}
