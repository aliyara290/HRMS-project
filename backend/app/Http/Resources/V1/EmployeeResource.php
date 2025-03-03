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
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'avatar' => $this->avatar,
            'jobTitle' => $this->jobTitle,
            'DepartmentName' => $this->DepartmentName,
            'contractStartDate' => $this->contract_start_date,
            'contractEndDate' => $this->contract_end_date,
            'dateOfBirth' => $this->date_of_birth,
            'address' => $this->address,
            'contractType' => $this->contract_type,
            'salary' => $this->salary,
        ];
    }
}
