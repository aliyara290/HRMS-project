<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeaveAndRecovery extends Model
{
    use HasFactory;
    protected $fillable = [
        "full_name",
        "user_id",
        "leave_type",
        "start_date",
        "end_date",
        "return_date",
        "total_days",
        "reason",
        "manager_aproval",
        "rh_aproval",
    ];
}
