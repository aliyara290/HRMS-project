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
            $table->foreignId('user_id')->constrained('users');
            $table->enum("leave_type", ["annual", "sick", "personal", "recovery", "bereavement", "parental", "unpaid"])->default("annual");
            $table->enum("status", ["accepted", "pending", "rejected"])->default("pending");
            $table->date('start_date');
            $table->date('end_date');
            $table->date('return_date');
            $table->integer("total_days")->default(0);
            $table->text("reason");
            $table->text('rejection_reason')->nullable();
            $table->enum("manager_aproval", ["accepted", "pending", "rejected"])->default("pending");
            $table->enum("rh_aproval", ["accepted", "pending", "rejected"])->default("pending");
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
