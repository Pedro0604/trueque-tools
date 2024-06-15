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
            'surname' => $this->surname,
            'email' => $this->email,
            'birth_date' => (new Carbon($this->birth_date))->format('d/m/Y'),
            'reputation' => $this->reputation,
            'sucursal' => new SucursalResource($this->sucursal),
            'total_trueques' => $this->total_trueques ?? 0,
        ];
    }
}
