<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('careers', function (Blueprint $table) {
            $table->id();
            $table->decimal('salary', 10, 2);
            $table->enum('contractType', ['CDD', 'CDI', 'Internship', 'Freelance']);
            $table->enum('status', ['active', 'inactive', 'terminated'])->default('active');
            $table->date('contract_start_date');
            $table->date('contract_end_date');
            $table->foreignId('employee_id')->constrained('employees');
            $table->foreignId('job_id')->constrained('jobs');
            $table->foreignId('department_id')->constrained('departments');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('careers');
    }
};
