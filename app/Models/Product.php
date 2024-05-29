<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category',
        'description',
        'image_path',
        'user_id',
        'sucursal_id',
        'promoted_at',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function sucursal(): BelongsTo
    {
        return $this->belongsTo(Sucursal::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function solicituds(): HasMany
    {
        return $this->hasMany(Solicitud::class, 'published_product_id');
    }

    public function offeredSolicituds(): HasMany
    {
        return $this->hasMany(Solicitud::class, 'offered_product_id');
    }

    public function publishedTrueque(): HasOneThrough
    {
        return $this->hasOneThrough(Trueque::class, Solicitud::class, 'published_product_id');
    }

    public function offeredTrueque(): HasOneThrough
    {
        return $this->hasOneThrough(Trueque::class, Solicitud::class, 'offered_product_id');
    }

    protected function hasTrueque(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->publishedTrueque()->exists() || $this->offeredTrueque()->exists(),
        );
    }
}
