<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
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
            'text' => $this->text,
            'created_at' => (new Carbon($this->created_at))->format('d/m/Y'),
            'user' => new UserResource($this->user),
            'response' => $this->response ? new CommentResource($this->response) : null,
        ];
    }
}