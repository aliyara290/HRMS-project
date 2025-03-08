<?php

namespace App\Http\Requests\V1;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class StoreLeaveAndRecoveryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'userId' => "required|integer",
            'leaveType' => "required|in:annual,sick,personal,recovery,bereavement,parental,unpaid",
            'startDate' => [
                'required',
                'date',
                'after_or_equal:today',
                'after_or_equal:' . Carbon::now()->addDays(7)->toDateString()
            ],
            'endDate' => [
                'required',
                'date',
                'after_or_equal:startDate',
                'after_or_equal:' . Carbon::now()->addDays(8)->toDateString()
            ],
            'returnDate' => 'required|date|after:endDate',
            'reason' => 'required|string',
            'totalDays' => 'integer'
        ];
    }
}
