<?php

namespace App\Http\Resources;

use App\Models\Solicitud;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Gate;

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
            'meeting_date_time' => (new Carbon($this->meeting_date_time))->format('d/m/Y H:i'),
            'state' => $this->state,
            'created_at' => (new Carbon($this->created_at))->format('d/m/Y H:i'),
            'canBeViewed' => Gate::allows('view', $this->resource),
            'canBeAccepted' => Gate::allows('accept', [Solicitud::class, $this->publishedProduct]),
            'canBeRejected' => Gate::allows('reject', [Solicitud::class, $this->publishedProduct]),
        ];
    }
}
