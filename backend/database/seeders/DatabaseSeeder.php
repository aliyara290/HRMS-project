<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Models\User; // Make sure to import the User model

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            // JobSeeder::class,
            // DepartmentSeeder::class,
            EmployeeSeeder::class,
        ]);

        // Define permissions as an array
        $permissions = [
            "edit users",
            "create users",
            "update users",
            "delete users",
            "edit employees",
            "create employees",
            "update employees",
            "delete employees",
            "edit departments",
            "create departments",
            "update departments",
            "delete departments",
            "edit jobs",
            "create jobs",
            "update jobs",
            "delete jobs",
        ];

        // Create permissions in a loop
        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create Roles
        $adminRole = Role::create(['name' => 'admin']);
        $managerRole = Role::create(['name' => 'manager']);

        // Assign Permissions to Admin Role
        $adminRole->givePermissionTo(['edit users', 'delete users']);

        // Assign Role to User
        $user = User::find(1); // Ensure user ID exists
        if ($user) {
            $user->assignRole('admin');
        }
    }
}
