<?php

namespace App\Http\Resources;

use App\Models\Comment;
use App\Models\Solicitud;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Gate;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $product = $this->resource;

        return [
            'id' => $this->id,
            'name' => $this->name,
            'category' => $this->category,
            'image_path' => $this->image_path,
            'description' => $this->description,
            'isCurrentlyPromoted' => $this->promoted_at && (new Carbon($this->promoted_at))->gt(Carbon::now()->subWeek()),
            'promoted_until' => $this->promoted_at ? (new Carbon($this->promoted_at))->addWeek()->format('d/m/y H:i') : null,
            'user' => new UserResource($this->user),
            'sucursal' => new SucursalResource($this->sucursal),
            'hasTrueque' => $this->hasTrueque,
            'isPaused' => $this->hasPendingTrueque,
            'was_deleted' => $product->trashed(),
            'can' => [
                'createComment' => Gate::allows('create', [Comment::class, $product]),
                'createSolicitud' => Gate::allows('create', [Solicitud::class, $product]),
                'listSolicituds' => Gate::allows('list', [Solicitud::class, $product]),
                'viewTrueque' => $this->hasTrueque && Gate::allows('view', $this->trueque),
                'promote' => Gate::allows('promote', $product),
                'update' => Gate::allows('update', $product),
                'delete' => Gate::allows('delete', $product),
            ],
        ];
    }
}
