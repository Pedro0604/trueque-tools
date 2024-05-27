<?php

namespace App\Http\Resources;

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
            'published_product' => new ProductResource($this->publishedProduct),
            'offered_product' => new ProductResource($this->offeredProduct),
            'was_rejected' => $this->was_rejected,
            'created_at' =>  (new Carbon($this->created_at))->format('d/m/Y H:i'),
        ];
    }
}
