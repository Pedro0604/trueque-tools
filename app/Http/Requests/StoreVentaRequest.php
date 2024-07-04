<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVentaRequest extends FormRequest
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
            'products' => ['required', 'array'],
            'products.*.name' => ['required', 'string'],
            'products.*.sell_price' => ['required', 'numeric'],
        ];
    }

    public function messages(): array
    {
        return [
            'products.required' => 'Se debe especificar al menos un producto para registrar una venta',
            'products.*.name.required' => 'El nombre del producto es obligatorio',
            'products.*.sell_price.required' => 'El precio de venta es obligatorio',
            'products.*.sell_price.numeric' => 'El precio de venta debe ser un valor numérico',
        ];
    }
}
