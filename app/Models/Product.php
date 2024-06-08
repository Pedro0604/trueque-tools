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

    public function publishedTrueques(): HasManyThrough
    {
        return $this->hasManyThrough(Trueque::class, Solicitud::class, 'published_product_id');
    }

    public function offeredTrueques(): HasManyThrough
    {
        return $this->hasManyThrough(Trueque::class, Solicitud::class, 'offered_product_id');
    }

    public function hasPendingTrueque(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->publishedTrueques()
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
            get: fn() => $this->publishedTrueques()
                    ->whereNotNull('ended_at')
                    ->where('is_failed', false)
                    ->exists() ||
                $this->offeredTrueques()
                    ->whereNotNull('ended_at')
                    ->where('is_failed', false)
                    ->exists(),
        );
    }

    public function trueque(): Attribute
    {
        if ($this->hasPendingTrueque()) {
            return Attribute::make(
                get: fn() => $this->publishedTrueques()
                    ->whereNull('ended_at')
                    ->get()
                    ??
                    $this->offeredTrueques()
                        ->whereNull('ended_at')
                        ->get()
            );
        } elseif ($this->hasSuccessfulTrueque()) {
            return Attribute::make(
                get: fn() => $this->publishedTrueques()
                        ->whereNotNull('ended_at')
                        ->where('is_failed', false)
                        ->get()
                    ??
                    $this->offeredTrueques()
                        ->whereNotNull('ended_at')
                        ->where('is_failed', false)
                        ->get()
            );
        }
        else{
            return Attribute::make(
                get: fn() => null,
            );
        }
    }
}
