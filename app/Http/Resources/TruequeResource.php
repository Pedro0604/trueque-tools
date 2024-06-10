<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Gate;

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
            'code' => $this->code,
            'ended_at' => $this->ended_at ? (new Carbon($this->ended_at))->format('d/m/Y H:i') : null,
            'failed' => $this->ended_at && $this->is_failed,
            'successful' => $this->ended_at && !$this->is_failed,
            'solicitud' => new SolicitudResource($this->solicitud),
            'canBeCanceled' => Gate::allows('cancel', $this->resource),
            'canBeEnded' => Gate::allows('end', $this->resource),
            'created_at' => (new Carbon($this->created_at))->format('d/m/Y H:i'),
        ];
    }
}
