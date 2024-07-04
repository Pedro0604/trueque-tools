<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use function Laravel\Prompts\password;

class DeleteSucursalRequest extends FormRequest
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
            'password' => ['required', 'string'],
            'transfer_sucursal_id' => ['required', 'integer', 'exists:sucursals,id',
                function ($attribute, $value, $fail) {
                    if ($value == $this->route('sucursal')->id) {
                        $fail('La sucursal de transferencia no puede ser la sucursal a eliminar.');
                    }
                }],
        ];
    }

    public function messages()
    {
        return [
            'transfer_sucursal_id.required' => 'La sucursal de transferencia es obligatoria.',
            'transfer_sucursal_id.exists' => 'La sucursal de transferencia seleccionada no existe.',
        ];
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate(): void
    {
        if (!Auth::guard('admin')->validate(['dni' => Auth::guard('admin')->user()->dni, 'password' => $this->only('password')['password']])) {
            throw ValidationException::withMessages([
                'password' => trans('auth.failed'),
            ]);
        }
    }
}
