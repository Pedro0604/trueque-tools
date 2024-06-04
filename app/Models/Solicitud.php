<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Solicitud extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'published_product_id',
        'offered_product_id',
        'meeting_date_time',
        'state',
    ];

    public function publishedProduct(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'published_product_id');
    }

    public function offeredProduct(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'offered_product_id');
    }

    public function trueque(): HasOne
    {
        return $this->hasOne(Trueque::class);
    }

    public function isNormal(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->state === 'normal',
        );
    }

    public function wasAccepted(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->state === 'accepted',
        );
    }

    public function isPaused(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->state === 'paused',
        );
    }

    public function wasRejected(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->state === 'rejected',
        );
    }
}
