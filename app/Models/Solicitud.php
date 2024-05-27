<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Solicitud extends Model
{
    use HasFactory;

    protected $fillable = [
        'published_product_id',
        'offered_product_id',
        'was_rejected',
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
}
