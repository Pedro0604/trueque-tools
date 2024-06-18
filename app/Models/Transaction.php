<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\DB;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'status',
        'price',
        'session_id',
        'user_id',
        'product_id',
        'source'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function markAsPaid(): void
    {
        if ($this->status === 'pending') {
            DB::transaction(function () {
                $this->product->update([
                    'promoted_at' => now(),
                ]);

                $this->update([
                    'status' => 'paid',
                ]);
            });
        }
    }

    public function markAsFailed(): void
    {
        if ($this->status === 'pending') {
            $this->update([
                'status' => 'failed',
            ]);
        }
    }
}
