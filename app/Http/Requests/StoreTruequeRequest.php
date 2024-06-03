<?php

namespace App\Http\Requests;

use App\Models\Solicitud;
use Illuminate\Foundation\Http\FormRequest;

class StoreTruequeRequest extends FormRequest
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
            'solicitud_id' => [
                'required',
                'integer',
                'exists:solicituds,id',
                'unique:trueques,solicitud_id',
                function ($attribute, $value, $fail) {
                    $solicitud = Solicitud::find($value);
                    if ($solicitud->was_rejected) {
                        $fail('La solicitud fue rechazada.');
                    }
                },
            ],
        ];
    }
}
