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
        Comment::factory(rand(Product::count(), Product::count() * 4))->create();
        Comment::factory(Product::count())->each(function ($comment) {
            // Determine whether the comment will have a response
            $hasResponse = rand(1, 100) <= 30; // 30% chance

            // If the comment has a response, get a random comment as response
            if ($hasResponse) {
                $responded_comment = Comment::inRandomOrder()->first();
                $responded_comment->update(['response_id' => $comment->id]);
                $comment->update(['product_id' => null]);
            }
        });
    }
}
