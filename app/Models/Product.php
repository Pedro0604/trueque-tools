<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory;
    use SoftDeletes;

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
        return $this->hasOneThrough(Trueque::class, Solicitud::class, 'published_product_id')->where('is_failed', false);
    }

    public function offeredTrueque(): HasOneThrough
    {
        return $this->hasOneThrough(Trueque::class, Solicitud::class, 'offered_product_id')->where('is_failed', false);
    }

    public function publishedFailedTrueques(): HasManyThrough
    {
        return $this->hasManyThrough(Trueque::class, Solicitud::class, 'published_product_id')->where('is_failed', true);
    }

    public function offeredFailedTrueques(): HasManyThrough
    {
        return $this->hasManyThrough(Trueque::class, Solicitud::class, 'offered_product_id')->where('is_failed', true);
    }

    public function hasTrueque(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->publishedTrueque()->exists() || $this->offeredTrueque()->exists(),
        );
    }

    public function isPaused(): Attribute
    {
        $published_trueque = $this->hasTrueque ? $this->publishedTrueque : null;
        $offered_trueque = $this->hasTrueque ? $this->offeredTrueque : null;
        $trueque = $published_trueque ?? $offered_trueque;
        return Attribute::make(
            get: fn() => $this->hasTrueque && $trueque->ended_at === null,
        );
    }
}
