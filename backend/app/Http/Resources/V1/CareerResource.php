<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CareerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'jobTitle' => $this->jobTitle,
            'DepartmentName' => $this->DepartmentName,
            'contractStartDate' => $this->contract_start_date,
            'contractEndDate' => $this->contract_end_date,
            'contractType' => $this->contractType,
            'salary' => $this->salary,
        ];
    }
}
