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

        $permissions = [
            "create users",
            "update users",
            "delete users",
            "create employees",
            "update employees",
            "delete employees",
            "create departments",
            "update departments",
            "delete departments",
            "create jobs",
            "update jobs",
            "delete jobs",
            "accept leaves",
            "reject leaves",
            "add leaves",
            "reject leaves",
            "reject leaves",
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        $adminRole = Role::create(['name' => 'admin']);
        $managerRole = Role::create(['name' => 'manager']);
        $rhRole = Role::create(['name' => 'rh']);
        $employeeRole = Role::create(['name' => 'employee']);

        $adminRole->givePermissionTo([
            "create users",
            "update users",
            "delete users",
            "create employees",
            "update employees",
            "delete employees",
            "create departments",
            "update departments",
            "delete departments",
            "create jobs",
            "update jobs",
            "delete jobs",
            "accept leaves",
            "reject leaves",
            "add leaves",
            "reject leaves",
            "reject leaves",
        ]);
        $managerRole->givePermissionTo([
            "create users",
            "update users",
            "delete users",
            "create employees",
            "update employees",
            "delete employees",
            "create departments",
            "update departments",
            "delete departments",
            "create jobs",
            "update jobs",
            "delete jobs",
            "accept leaves",
            "reject leaves",
            "add leaves",
            "reject leaves",
            "reject leaves",
        ]);
        $rhRole->givePermissionTo([
            "create users",
            "update users",
            "delete users",
            "create employees",
            "update employees",
            "delete employees",
            "create departments",
            "update departments",
            "delete departments",
            "create jobs",
            "update jobs",
            "delete jobs",
            "accept leaves",
            "reject leaves",
            "add leaves",
            "reject leaves",
            "reject leaves",
        ]);
        $employeeRole->givePermissionTo([
            "add leaves",
        ]);

        $user = User::find(1);
            
        if ($user) {
            $user->assignRole('admin');
        }
    }
}
