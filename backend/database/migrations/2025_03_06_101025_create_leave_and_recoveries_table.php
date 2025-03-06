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
        Schema::create('leave_and_recoveries', function (Blueprint $table) {
            $table->id();
            $table->string("full_name");
            $table->foreignId('employee_id')->constrained('employees');
            $table->enum("leave_type", ["annual", "sick", "personal", "recovery", "bereavement", "parental", "unpaid"])->default("annual");
            $table->enum("status", ["accepted", "pending", "rejected"])->default("pending");
            $table->date('start_date');
            $table->date('end_date');
            $table->date('return_date');
            $table->integer("total_days");
            $table->text("reason");
            $table->boolean('manager_aproval')->default(false);
            $table->boolean('rh_aproval')->default(false);
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leave_and_recoveries');
    }
};
