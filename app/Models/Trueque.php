<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trueque extends Model
{
    use HasFactory;

    protected $fillable = [
        'ended_at',
        'is_failed',
        'solicitud_id',
    ];

    public function solicitud()
    {
        return $this->belongsTo(Solicitud::class);
    }
}
