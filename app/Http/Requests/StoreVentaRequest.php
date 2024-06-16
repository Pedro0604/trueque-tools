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
            'publishedUserProducts' => ['required_without:offeredUserProducts', 'array'],
            'publishedUserProducts.*.bar_code' => ['required_with:publishedUserProducts', 'string'],
            'publishedUserProducts.*.sell_price' => ['required_with:publishedUserProducts', 'numeric'],
            'offeredUserProducts' => ['required_without:publishedUserProducts', 'array'],
            'offeredUserProducts.*.bar_code' => ['required_with:offeredUserProducts', 'string'],
            'offeredUserProducts.*.sell_price' => ['required_with:offeredUserProducts', 'numeric'],
        ];
    }

    public function messages(): array
    {
        return [
            'publishedUserProducts.required_without' => 'Se debe especificar al menos un producto para registrar una venta',
            'offeredUserProducts.required_without' => 'Se debe especificar al menos un producto para registrar una venta',
            'publishedUserProducts.*.bar_code.required_with' => 'El código de barras es obligatorio',
            'publishedUserProducts.*.sell_price.required_with' => 'El precio de venta es obligatorio',
            'publishedUserProducts.*.sell_price.numeric' => 'El precio de venta debe ser un valor numérico',
            'offeredUserProducts.*.bar_code.required_with' => 'El código de barras es obligatorio',
            'offeredUserProducts.*.sell_price.required_with' => 'El precio de venta es obligatorio',
            'offeredUserProducts.*.sell_price.numeric' => 'El precio de venta debe ser un valor numérico',
        ];
    }
}
