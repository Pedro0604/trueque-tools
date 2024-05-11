<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'category' => $this->category,
            'image_path' => $this->image_path,
            'description' => $this->description,
            'promoted_at' => (new Carbon($this->promoted_at))->format('d/m/Y'),
            'user' => new UserResource($this->user),
            'sucursal' => new SucursalResource($this->sucursal),
        ];
    }
}
