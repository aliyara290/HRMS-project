<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LeaveAndRecoveryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'employee_id' => $this->id,
            'totalDays' => $this->total_days,
            'position' => $this->position,
            'startDate' => $this->start_date,
            'endDate' => $this->end_date,
            'reason' => $this->reason,
            'returnDate' => $this->return_date,
            'leaveType' => $this->leave_type,
            'employeeName' => $this->fullName,
            'status' => $this->status,
            'submittedOn' => $this->created_at,
            'managerApproval' => $this->manager_aproval,
            'rhApproval' => $this->rh_aproval,
        ];
    }
}
