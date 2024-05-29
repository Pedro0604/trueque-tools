<?php

namespace App\Http\Resources;

use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SolicitudResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'published_product_id' => [
                'required',
                'integer',
                'exists:products,id',
                function ($attribute, $value, $fail) {
                    $product = Product::find($value);
                    if ($product->publishedTrueque || $product->offeredTrueque) {
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
                    if ($product->publishedTrueque || $product->offeredTrueque) {
                        $fail('El producto ofertado ya fue trocado.');
                    }
                    if ($product->offeredSolicituds()->where('published_product_id', $this->published_product_id)->exists()) {
                        $fail('El producto ofertado ya tiene una solicitud para el producto publicado.');
                    }
                },
            ],
            'published_product' => new ProductResource($this->publishedProduct),
            'offered_product' => new ProductResource($this->offeredProduct),
            'meeting_date_time' => (new Carbon($this->meeting_date_time))->format('d/m/Y H:i'),
            'was_rejected' => $this->was_rejected,
            'created_at' => (new Carbon($this->created_at))->format('d/m/Y H:i'),
        ];
    }
}
