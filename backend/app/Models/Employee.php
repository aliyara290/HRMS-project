<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'department_id',
        'contract_start_date',
        'contract_end_date',
        'job_id',
        'date_of_birth',
        'address',
        'contract_type',
        'salary',
    ];

    public function department() {
        return $this->belongsTo(Department::class);
    }
}
