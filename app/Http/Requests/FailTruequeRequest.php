<?php

namespace App\Http\Requests;

use App\Models\Product;
use App\Models\TruequeError;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FailTruequeRequest extends FormRequest
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
            'offered_error_id' => [
                'required',
                'integer',
                function ($attribute, $value, $fail) {
                    if($value == 0 && $this->published_error_id == 0) {
                        $fail('Al menos un producto debe tener un error.');
                    }
                },
                function ($attribute, $value, $fail) {
                    if ($value != 0 && !TruequeError::where('id', $value)->exists()) {
                        $fail('El error seleccionado no existe. Por favor intentá nuevamente.');
                    }
                },
            ],
            'published_error_id' => [
                'required',
                'integer',
                function ($attribute, $value, $fail) {
                    if($value == 0 && $this->offered_error_id == 0) {
                        $fail('Al menos un producto debe tener un error.');
                    }
                },
                function ($attribute, $value, $fail) {
                    if ($value != 0 && !TruequeError::where('id', $value)->exists()) {
                        $fail('El error seleccionado no existe. Por favor intentá nuevamente.');
                    }
                },
            ],
        ];
    }

    /**
     * Validate the class instance.
     *
     * @return void
     */
    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            if ($this->offered_error_id == 0 && $this->published_error_id == 0) {
                $validator->errors()->add('offered_error_id', 'Al menos un producto debe tener un error.');
                $validator->errors()->add('published_error_id', 'Al menos un producto debe tener un error.');
            }
        });
    }
}
