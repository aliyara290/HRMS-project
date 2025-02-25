<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'address',
        'contract_type',
        'salary',
        'date_of_birth',
        'department_id',
        'recruitment_date',
    ];

    public function department() {
        return $this->belongsTo(Department::class);
    }
}
