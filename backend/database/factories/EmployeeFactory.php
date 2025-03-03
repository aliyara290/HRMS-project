<?php

namespace Database\Factories;

use App\Models\Department;
use App\Models\Job;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'department_id' => Department::factory(),
            'date_of_birth' => $this->faker->date(),
            'contract_start_date' => $this->faker->date(),
            'contract_end_date' => $this->faker->date(),
            'job_id' => Job::factory(),
            'address' => $this->faker->address(),
            'contract_type' => $this->faker->randomElement(['CDI', 'CDD', 'Internship', 'Freelance']),
            'salary' => $this->faker->numberBetween(1000, 10000),
        ];
    }
}
