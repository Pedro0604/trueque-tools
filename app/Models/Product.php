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
        return $this->belongsTo(User::class)->withTrashed();
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

    public function publishedTrueques(): HasManyThrough
    {
        return $this->hasManyThrough(Trueque::class, Solicitud::class, 'published_product_id');
    }

    public function offeredTrueques(): HasManyThrough
    {
        return $this->hasManyThrough(Trueque::class, Solicitud::class, 'offered_product_id');
    }

    public function publishedPendingTrueque(): HasOneThrough
    {
        return $this->hasOneThrough(Trueque::class, Solicitud::class, 'published_product_id')
            ->whereNull('ended_at');
    }

    public function offeredPendingTrueque(): HasOneThrough
    {
        return $this->hasOneThrough(Trueque::class, Solicitud::class, 'offered_product_id')
            ->whereNull('ended_at');
    }

    public function publishedSuccessfulTrueque(): HasOneThrough
    {
        return $this->hasOneThrough(Trueque::class, Solicitud::class, 'published_product_id')
            ->whereNotNull('ended_at')
            ->where('is_failed', false);
    }

    public function offeredSuccessfulTrueque(): HasOneThrough
    {
        return $this->hasOneThrough(Trueque::class, Solicitud::class, 'offered_product_id')
            ->whereNotNull('ended_at')
            ->where('is_failed', false);
    }

    public function publishedFailedTrueques(): HasManyThrough
    {
        return $this->hasManyThrough(Trueque::class, Solicitud::class, 'published_product_id')
            ->whereNotNull('ended_at')
            ->where('is_failed', true);
    }

    public function offeredFailedTrueques(): HasManyThrough
    {
        return $this->hasManyThrough(Trueque::class, Solicitud::class, 'offered_product_id')
            ->whereNotNull('ended_at')
            ->where('is_failed', true);
    }

    public function hasPendingTrueque(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->publishedTrueques()
                ->whereNull('ended_at')
                ->exists() ||
                $this->offeredTrueques()
                ->whereNull('ended_at')
                ->exists(),
        );
    }

    public function hasSuccessfulTrueque(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->publishedTrueques()
                ->whereNotNull('ended_at')
                ->where('is_failed', false)
                ->exists() ||
                $this->offeredTrueques()
                ->whereNotNull('ended_at')
                ->where('is_failed', false)
                ->exists(),
        );
    }

    public function hasTrueque(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->hasPendingTrueque || $this->hasSuccessfulTrueque,
        );
    }

    public function trueque(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->publishedSuccessfulTrueque ?? $this->offeredSuccessfulTrueque ?? $this->publishedPendingTrueque ?? $this->offeredPendingTrueque,
        );
    }
}
