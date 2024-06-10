<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
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
        'published_error_id',
        'offered_error_id',
    ];

    public function solicitud(): BelongsTo
    {
        return $this->belongsTo(Solicitud::class);
    }

    public function published_error(): BelongsTo
    {
        return $this->belongsTo(TruequeError::class, 'published_error_id');
    }

    public function offered_error(): BelongsTo
    {
        return $this->belongsTo(TruequeError::class, 'offered_error_id');
    }
}
