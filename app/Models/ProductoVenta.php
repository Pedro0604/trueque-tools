<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductoVenta extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'sell_price',
        'venta_id',
    ];

    public function venta(): BelongsTo
    {
        return $this->belongsTo(Venta::class);
    }
}
