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
        Comment::factory(rand(Product::count(), Product::count() * 5))->create()->each(function ($comment) {
            // Determine whether the comment will have a response
            $hasResponse = rand(1, 100) <= 30; // 30% chance

            // If the comment has a response, get a random comment as response
            if ($hasResponse) {
                $responseComment = Comment::inRandomOrder()->first();
                $comment->update(['response_id' => $responseComment ? $responseComment->id : null]);
            }
        });
    }
}
