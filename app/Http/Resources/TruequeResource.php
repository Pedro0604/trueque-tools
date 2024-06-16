<?php

namespace App\Http\Resources;

use App\Models\Venta;
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
            'published_error' => $this->published_error ? new TruequeErrorResource($this->published_error): null,
            'offered_error' => $this->offered_error ? new TruequeErrorResource($this->offered_error): null,
            'successful' => $this->ended_at && !$this->is_failed,
            'solicitud' => new SolicitudResource($this->solicitud),
            'created_at' => (new Carbon($this->created_at))->format('d/m/Y H:i'),
            'can' => [
                'cancel' => Gate::allows('cancel', $this->resource),
                'end' => Gate::allows('end', $this->resource),
                'fail' => Gate::allows('fail', $this->resource),
                'createVenta' => Gate::allows('create', [Venta::class, $this->resource]),
                'viewVenta' => Gate::allows('viewAny', Venta::class),
            ],
        ];
    }
}
