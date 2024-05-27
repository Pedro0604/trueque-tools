<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Product;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Comment::factory(rand(Product::count() * 3, Product::count() * 5))->create();
        Comment::factory(Comment::count())->create()->each(function ($comment) {
            // Determine whether the comment will have a response
            $hasResponse = rand(1, 100) <= 40; // 40% chance

            // If the comment has a response, get a random comment as response
            if ($hasResponse) {
                $responded_comment = Comment::inRandomOrder()->first();
                while (!$responded_comment->product_id) {
                    $responded_comment = Comment::inRandomOrder()->first();
                }
                $responded_comment->update(['response_id' => $comment->id]);
                $comment->update([
                    'product_id' => null,
                    'user_id' => $responded_comment->product->user_id
                ]);
            }
        });
    }
}
