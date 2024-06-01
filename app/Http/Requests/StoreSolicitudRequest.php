<?php

namespace App\Http\Requests;

use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;

class StoreSolicitudRequest extends FormRequest
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
            'published_product_id' => [
                'required',
                'integer',
                'exists:products,id',
                function ($attribute, $value, $fail) {
                    $product = Product::find($value);
                    if ($product->hasTrueque()) {
                        $fail('El producto publicado ya fue trocado.');
                    }
                },
            ],
            'offered_product_id' => [
                'required',
                'integer',
                'exists:products,id',
                'different:published_product_id',
                function ($attribute, $value, $fail) {
                    $product = Product::find($value);
                    if ($product->hasTrueque()) {
                        $fail('El producto ofertado ya fue trocado.');
                    }
                    if ($product->offeredSolicituds()->where('published_product_id', $this->published_product_id)->exists()) {
                        $fail('El producto ofertado ya tiene una solicitud para el producto publicado.');
                    }
                },
            ],
            'meeting_date_time' => [
                'required',
                'date',
                'after:+1 day',
                function ($attribute, $value, $fail) {
                    $time = date('H', strtotime($value));
                    if ($time < 8 || $time > 20) {
                        $fail('El trueque debe ser entre las 8:00 y las 20:00 hs.');
                    }
                },
            ],
        ];
    }
}
