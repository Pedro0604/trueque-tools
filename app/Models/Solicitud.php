<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solicitud extends Model
{
    use HasFactory;

    protected $fillable = [
        'published_product_id',
        'offered_product_id',
        'was_rejected',
    ];
}
