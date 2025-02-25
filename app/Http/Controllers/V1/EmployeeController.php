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

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new EmployeeCollection(Employee::paginate(20));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeeRequest $request)
    {
        db::transaction(function () use ($request) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make(Str::random(12)),
            ]);
            Employee::create([
                'user_id' => $user->id,
                'department_id' => $request->department_id,
                'recruitment_date' => $request->recruitment_date,
                'date_of_birth' => $request->date_of_birth,
                'address' => $request->address,
                'contract_type' => $request->contract_type,
                'salary' => $request->salary,
            ]);
        });
    }

    /**
     * Display the specified resource.
     */

    public function show(Employee $employee)
    {
        return new EmployeeResource($employee);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        //
    }
}
