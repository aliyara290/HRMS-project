<?php

namespace Database\Factories;

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
            'user_id' => User::inRandomOrder()->first()->id,
            'department_id' => $this->faker->randomElement([1, 2, 3, 6, 7]),
            'recruitment_date' => $this->faker->date(),
            'date_of_birth' => $this->faker->date(),
            'address' => $this->faker->address(),
            'contract_type' => $this->faker->randomElement(['CDI', 'CDD', 'Internship', 'Freelance']),
            'salary' => $this->faker->numberBetween(1000, 10000),

        ];
    }
}
