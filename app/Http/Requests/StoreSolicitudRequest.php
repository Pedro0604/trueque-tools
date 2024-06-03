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
                    if ($product->hasTrueque) {
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
                    $publishedProduct = Product::find($this->published_product_id);
                    $offeredProduct = Product::find($value);

                    if ($offeredProduct->hasTrueque) {
                        $fail('El producto ofertado ya fue trocado.');
                    }
                    if ($offeredProduct->offeredSolicituds()->where('published_product_id', $this->published_product_id)->exists()) {
                        $fail('El producto ofertado ya tiene una solicitud para el producto publicado.');
                    }
                    if ($publishedProduct->category != $offeredProduct->category) {
                        $fail('Ambos productos deben tener la misma categoría.');
                    }
                    if ($offeredProduct->user_id != auth()->id()) {
                        $fail('El producto ofertado debe pertenecerte.');
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

    public function messages()
    {
        return [
            'published_product_id.required' => 'El producto publicado es obligatorio.',
            'published_product_id.exists' => 'El producto publicado no existe.',
            'offered_product_id.required' => 'El producto ofertado es obligatorio.',
            'offered_product_id.exists' => 'El producto ofertado no existe. Recargue la página y vuelva a intentarlo.',
            'offered_product_id.different' => 'El producto ofertado no puede ser el mismo que el publicado.',
            'meeting_date_time.required' => 'La fecha y hora del encuentro es obligatoria.',
            'meeting_date_time.date' => 'La fecha y hora de encuentro debe ser una fecha válida.',
            'meeting_date_time.after' => 'La fecha y hora de encuentro debe ser al menos 24hs después de la solicitud.',
        ];
    }
}
