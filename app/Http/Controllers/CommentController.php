<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class CommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommentRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment): Response|ResponseFactory
    {
        return inertia('Comment/Show', ['comment' => new commentResource($comment)]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comments)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommentRequest $request, Comment $comments)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comments)
    {
        //
    }
}
