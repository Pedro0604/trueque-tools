<?php

namespace App\Http\Controllers;

use App\Http\Resources\TruequeResource;
use App\Models\Trueque;
use App\Http\Requests\StoreTruequeRequest;
use App\Http\Requests\UpdateTruequeRequest;
use Inertia\Response;
use Inertia\ResponseFactory;

class TruequeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTruequeRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Trueque $trueque)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Trueque $trueque)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTruequeRequest $request, Trueque $trueque)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Trueque $trueque)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function myTrueques(): Response|ResponseFactory
    {
        $trueques = Trueque::all()
            ->sortByDesc('created_at')
            ->where('user_id', auth()->id())
            ->union(Trueque::all()
                ->sortByDesc('created_at')
                ->where('solicitud_id', auth()->id()));
        return inertia('Trueque/MyTrueques', [
            'trueques' => TruequeResource::collection($trueques),
            'truequeCreatedId' => session('trueque_created_id'),
        ]);
    }

}
