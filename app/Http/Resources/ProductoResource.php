<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductoResource extends JsonResource
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
            'nombre' => $this->nombre,
            'categoria' => $this->categoria,
            'foto_url' => $this->foto_url,
            'descripcion' => $this->descripcion,
            'promoted_at' => (new Carbon($this->promoted_at))->format('d/m/Y'),
            'user' => new UserResource($this->user),
            'sucursal' => new SucursalResource($this->sucursal),
        ];
    }
}
