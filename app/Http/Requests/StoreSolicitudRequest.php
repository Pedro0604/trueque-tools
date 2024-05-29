<?php

namespace App\Http\Requests;

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
        // TODO - VALIDAR QUE EL PRODUCTO NO ESTÉ TROCADO
        // TODO - VALIDAR QUE LA FECHA SEA ENTRE LAS 9 Y LAS 18 (O QSY)
        return [
            'offered_product_id' => ['required', 'integer', 'exists:products,id'],
            'meeting_date_time' => ['required', 'date', 'after:+1 day'],
        ];
    }
}
