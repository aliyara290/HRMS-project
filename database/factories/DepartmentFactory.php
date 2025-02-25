<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Department>
 */
class DepartmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement(['IT', 'Finance', 'Accounting', 'Commerce', 'Marketing', 'Security']),
            'manager_id' => $this->faker->randomElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        ];
    }
}
