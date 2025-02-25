<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'userId' => $this->user_id,
            'departmentId' => $this->department_id,
            'recruitment_date' => $this->recruitment_date,
            'dateOfBirth' => $this->date_of_birth,
            'address' => $this->address,
            'contractType' => $this->contract_type,
            'salary' => $this->salary,
        ];
    }
}
