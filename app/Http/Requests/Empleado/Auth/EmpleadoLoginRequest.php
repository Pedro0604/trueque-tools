<?php

namespace App\Http\Requests\Empleado\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class EmpleadoLoginRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'dni' => ['required', 'integer'],
            'password' => ['required', 'string'],
        ];
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate(): void
    {
        if (!Auth::guard('empleado')->attempt($this->only('dni', 'password'), $this->boolean('remember'))) {
            throw ValidationException::withMessages([
                'dni' => trans('auth.failed'),
                'password' => trans('auth.failed'),
            ]);
        }
    }
}
