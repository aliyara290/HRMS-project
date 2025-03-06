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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained('users')->onDelete('cascade');
            $table->date('date_of_birth');
            $table->text('address')->nullable();
            $table->enum('contract_type', ['CDI', 'CDD', 'Internship', 'Freelance']);
            $table->date('contract_start_date');
            $table->date('contract_end_date');
            $table->integer('total_leave_days')->default(0);
            $table->integer('total_days_due')->default(0);
            $table->decimal('salary', 10, 2)->default(0);
            $table->enum('status', ['active', 'inactive', 'terminated'])->default('active');
            $table->foreignId('job_id')->nullable()->constrained('jobs')->onDelete('set null');
            $table->foreignId('department_id')->nullable()->constrained('departments')->onDelete('set null');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
