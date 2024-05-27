<?php

namespace App\Http\Controllers;

use App\Models\Solicitud;
use App\Http\Requests\StoreSolicitudRequest;
use App\Http\Requests\UpdateSolicitudRequest;

class SolicitudController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSolicitudRequest $request)
    {
        //
    }

    /**
     * Accept a product exchange request.
     */
    public function accept(StoreSolicitudRequest $request)
    {
        //
    }

    /**
     * Reject a product exchange request.
     */
    public function reject(StoreSolicitudRequest $request, Solicitud $solicitud)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Solicitud $solicitud)
    {
        //
    }
}
