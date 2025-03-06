<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Employee::factory()->create([
        //     'user_id' => 1,
        //     'date_of_birth' => '2001-03-03',
        //     'address' => 'Laayoune',
        //     'contract_type' => 'CDD',
        //     'contract_start_date' => '2021-03-03',
        //     'contract_end_date' => '2025-03-03',
        //     'salary' => 9000,
        //     'job_id' => 1,
        //     'department_id' => 1,
        // ]);
        Employee::factory()->count(20)->create();
    }
}
