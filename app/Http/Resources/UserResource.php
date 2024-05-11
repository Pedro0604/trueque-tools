<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'apellido' => $this->apellido,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'fecha_nacimiento' => (new Carbon($this->fecha_nacimiento))->format('d/m/Y'),
            'reputacion' => $this->reputacion,
            'sucursal' => new SucursalResource($this->sucursal),
        ];
    }
}
