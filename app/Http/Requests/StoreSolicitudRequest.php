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
        // TODO - NO SE DEBERÍA PODER SOLICITAR UN TRUEQUE A UN PRODUCTO 1 (QUE LE SOLICITÓ
        // UN TRUEQUE A MI PRODUCTO 2) CON MI PRODUCTO 2, DEBERÍA INFORMAR QUE YA HAY UNA SOLICITUD?
        // TODO - MODIFICAR MENSAJES DE ERROR
        // TODO - VALIDAR QUE EL PRODUCTO NO ESTÉ TROCADO
        // TODO - VALIDAR QUE LA FECHA SEA ENTRE LAS 9 Y LAS 18 (O QSY)
        return [
            'published_product_id' => ['required', 'integer', 'exists:products,id'],
            'offered_product_id' => ['required', 'integer', 'exists:products,id', 'different:published_product_id'],
            'meeting_date_time' => ['required', 'date', 'after:+1 day'],
        ];
    }
}
