<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TruequeResource extends JsonResource
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
            'ended_at' => $this->ended_at ? (new Carbon($this->ended_at))->format('d/m/Y H:i') : null,
            'is_failed' => $this->is_failed,
            'solicitud_id' => new SolicitudResource($this->solicitud),
            'created_at' => (new Carbon($this->created_at))->format('d/m/Y H:i'),
        ];
    }
}
