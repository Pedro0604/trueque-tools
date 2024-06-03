<?php

namespace App\Http\Resources;

use App\Models\Comment;
use App\Models\Product;
use App\Models\Solicitud;
use App\Models\Trueque;
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
        $published_trueque = $product->hasTrueque ? $product->publishedTrueque : null;
        $offered_trueque = $product->hasTrueque ? $product->offeredTrueque : null;
        $trueque = $published_trueque ?? $offered_trueque;

        return [
            'id' => $this->id,
            'name' => $this->name,
            'category' => $this->category,
            'image_path' => $this->image_path,
            'description' => $this->description,
            'promoted_at' => $this->promoted_at ? (new Carbon($this->promoted_at))->format('d/m/Y') : null,
            'user' => new UserResource($this->user),
            'sucursal' => new SucursalResource($this->sucursal),
            'hasTrueque' => $this->hasTrueque,
            'canCreateComment' => Gate::allows('create', [Comment::class, $product]),
            'canCreateSolicitud' => Gate::allows('create', [Solicitud::class, $product]),
            'canListSolicituds' => Gate::allows('list', [Solicitud::class, $product]),
            'canViewTrueque' => $this->hasTrueque ? Gate::allows('view', $trueque) : false,
        ];
    }
}
