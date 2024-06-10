<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Trueque extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'code',
        'ended_at',
        'is_failed',
        'solicitud_id',
        'failedReason',
    ];

    public function solicitud()
    {
        return $this->belongsTo(Solicitud::class);
    }
}
