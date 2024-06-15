<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'text',
        'user_id',
        'product_id',
        'response_id'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function response(): belongsTo
    {
        return $this->belongsTo(Comment::class, 'response_id');
    }

    public function originalComment(): HasOne
    {
        return $this->hasOne(Comment::class, 'response_id');
    }
}
