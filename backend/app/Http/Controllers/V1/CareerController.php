<?php

namespace App\Http\Controllers\V1;

use App\Models\Career;
use App\Http\Requests\V1\StoreCareerRequest;
use App\Http\Requests\V1\UpdateCareerRequest;
use App\Models\Employee;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\CareerCollection;

class CareerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCareerRequest $request)
    {
        DB::transaction(function () use ($request)  {
            $career = Career::create([
                'employee_id' => $request->employeeId,
                'department_id' => $request->departmentId,
                'contract_start_date' => $request->contractStartDate,
                'contract_end_date' => $request->contractEndDate,
                'job_id' => $request->jobId,
                'contractType' => $request->contractType,
                'salary' => $request->salary,
                'status' => $request->status,
            ]);
            $employee = Employee::findOrFail($request->employeeId);
            $employee->update([
                'department_id' => $request->departmentId,
                'contract_start_date' => $request->contractStartDate,
                'contract_end_date' => $request->contractEndDate,
                'job_id' => $request->jobId,
                'contract_type' => $request->contractType,
                'salary' => $request->salary,
                'status' => $request->status,
            ]);

        });

        return response()->json(["response" => "Career added succefully"], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($employee_id)
{
    $employee = Employee::findOrFail($employee_id);

    $careers = Career::leftJoin('employees', 'careers.employee_id', '=', 'employees.id')
        ->leftJoin('jobs', 'careers.job_id', '=', 'jobs.id')
        ->leftJoin('departments', 'careers.department_id', '=', 'departments.id')
        ->where('careers.employee_id', '=', $employee->id)
        ->select('careers.*', 'jobs.title AS jobTitle', 'departments.name AS DepartmentName')
        ->orderBy('careers.contract_start_date')
        ->get();

    return new CareerCollection($careers);
}

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCareerRequest $request, Career $career)
    {
        // Implementation for updating a specific career
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Career $career)
    {
        // Implementation for deleting a specific career
    }
}