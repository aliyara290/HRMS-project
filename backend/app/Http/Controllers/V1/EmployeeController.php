<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\StoreEmployeeRequest;
use App\Http\Requests\V1\UpdateEmployeeRequest;
use App\Http\Resources\V1\EmployeeCollection;
use App\Http\Resources\V1\EmployeeResource;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\UserMail;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employees = Employee::leftJoin('users', 'employees.user_id', '=', 'users.id')
            ->leftJoin('jobs', 'employees.job_id', '=', 'jobs.id')
            ->leftJoin('departments', 'employees.department_id', '=', 'departments.id')
            ->select('employees.*', 'users.name', 'users.email', 'users.phone', 'users.avatar', 'jobs.title AS jobTitle', 'departments.name AS DepartmentName')
            ->orderBy('employees.id', 'desc')
            ->paginate(8);
        $EmployeeCollection = new EmployeeCollection($employees);
        return $EmployeeCollection;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeeRequest $request)
    {
        $user = DB::transaction(function () use ($request) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => Hash::make('Yara2001'),
            ]);

            Employee::create([
                'user_id' => $user->id,
                'department_id' => $request->departmentId,
                'contract_start_date' => $request->contractStartDate,
                'contract_end_date' => $request->contractEndDate,
                'job_id' => $request->jobId,
                'date_of_birth' => $request->dateOfBirth,
                'address' => $request->address,
                'contract_type' => $request->contractType,
                'salary' => $request->salary,
            ]);

            return $user;
        });

        Mail::to($user->email)->send(new UserMail($user->name));
        return response()->json(['message' => 'Employee added successfully'], 200);
    }


    /**
     * Display the specified resource.
     */

    public function show(Employee $employee)
    {
        $employeeData = Employee::leftJoin('users', 'employees.user_id', '=', 'users.id')
            ->leftJoin('jobs', 'employees.job_id', '=', 'jobs.id')
            ->leftJoin('departments', 'employees.department_id', '=', 'departments.id')
            ->select('employees.*', 'users.name', 'users.email', 'users.phone', 'users.avatar', 'jobs.title AS jobTitle', 'departments.name AS DepartmentName')
            ->where('employees.id', '=', $employee->id)
            ->firstOrFail();

        return new EmployeeResource($employeeData);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        DB::transaction(function () use ($request, $employee) {
            $user = User::find($employee->user_id);

            if ($user) {
                $user->update([
                    'name' => $request->name,
                    'email' => $request->email,
                    'phone' => $request->phone,
                ]);
            }

            $employee->update([
                'department_id' => $request->departmentId,
                'contract_start_date' => $request->contractStartDate,
                'contract_end_date' => $request->contractEndDate,
                'job_id' => $request->jobId,
                'date_of_birth' => $request->dateOfBirth,
                'address' => $request->address,
                'contract_type' => $request->contractType,
                'salary' => $request->salary,
            ]);
        });

        return response()->json(['message' => 'Employee updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $employee = Employee::find($id);
        if ($employee) {
            $employee->delete();
            return response()->json(['message' => 'Employee deleted successfully'], 200);
        }
        return response()->json(['message' => 'Employee not found'], 404);
    }
}
