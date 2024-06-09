<?php

namespace App\Http\Controllers;

use App\Http\Resources\TruequeResource;
use App\Models\Product;
use App\Models\Solicitud;
use App\Models\Trueque;
use App\Http\Requests\StoreTruequeRequest;
use App\Http\Requests\UpdateTruequeRequest;
use App\Models\User;
use Inertia\Response;
use Inertia\ResponseFactory;

class TruequeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $trueques = Trueque::orderBy('created_at', 'desc')->get();

        return inertia('Trueque/Index', [
            'trueques' => TruequeResource::collection($trueques),
        ]);
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
    public function show(Trueque $trueque): Response|ResponseFactory
    {
        return inertia('Trueque/show', [
            'trueque' => new TruequeResource($trueque),
        ]);
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
        $trueques = Trueque::whereHas('solicitud.publishedProduct', function ($query) {
            $query->where('user_id', auth()->id());
        })
            ->orWhereHas('solicitud.offeredProduct', function ($query) {
                $query->where('user_id', auth()->id());
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return inertia('Trueque/MyTrueques', [
            'trueques' => TruequeResource::collection($trueques),
        ]);
    }

}
