<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // User::factory()->create([
        //     'name' => 'Ali Yara',
        //     'Email' => 'ali.yara.cc@gmail.com',
        //     'password' => 'Yara2001',
        //     'phone' => '0643569435'
        // ]);
        User::factory()->count(20)->create();
    }
}
