<?php

namespace App\Http\Controllers;

use App\Http\Resources\TruequeResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\VentaResource;
use App\Models\Admin;
use App\Models\Trueque;
use App\Models\User;
use App\Models\Venta;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Response;
use Inertia\ResponseFactory;

class AdminController extends Controller
{
    public function showMostTruequesUsers(): Response|ResponseFactory
    {
        $publishedProductUsers = DB::table('trueques')
            ->where('trueques.ended_at', '!=', null)
            ->where('trueques.is_failed', '=', false)
            ->join('solicituds', 'trueques.solicitud_id', '=', 'solicituds.id')
            ->join('products as published_products', 'solicituds.published_product_id', '=', 'published_products.id')
            ->select('published_products.user_id', DB::raw('count(*) as total'))
            ->groupBy('published_products.user_id');

        $offeredProductUsers = DB::table('trueques')
            ->where('trueques.ended_at', '!=', null)
            ->where('trueques.is_failed', '=', false)
            ->join('solicituds', 'trueques.solicitud_id', '=', 'solicituds.id')
            ->join('products as offered_products', 'solicituds.offered_product_id', '=', 'offered_products.id')
            ->select('offered_products.user_id', DB::raw('count(*) as total'))
            ->groupBy('offered_products.user_id');

        $userCounts = DB::query()
            ->fromSub($publishedProductUsers->unionAll($offeredProductUsers), 'union_subquery')
            ->select('user_id', DB::raw('sum(total) as total'))
            ->groupBy('user_id')
            ->orderBy('total', 'desc');

        $users = User::query()
            ->withTrashed()
            ->joinSub($userCounts, 'union_subquery', function ($join) {
                $join->on('users.id', '=', 'union_subquery.user_id');
            })
            ->select('users.*', 'union_subquery.total as total_trueques')
            ->get();

        return inertia('Admin/Statistics/MostTruequesUsers', [
            'users' => UserResource::collection($users),
        ]);
    }

    public function showTruequesBetweenDates(): Response|ResponseFactory|RedirectResponse
    {
        if(request('start_date') && request('end_date')) {
            if(request('start_date') > request('end_date')){
                return redirect()->back()
                    ->with('error', [
                        'message' => 'La fecha de inicio no puede ser mayor a la fecha de fin.',
                        'key' => rand()
                    ]);
            }
        }

        $trueques = Trueque::query();

        if(request('start_date')){
            $trueques->where('trueques.ended_at', '>=', request('start_date'));
        }
        if (request('end_date')) {
            $trueques->where('trueques.ended_at', '<=', request('end_date'));
        }

        return inertia('Admin/Statistics/TruequesBetweenDates', [
            'trueques' => TruequeResource::collection($trueques->get()),
        ]);
    }
    public function showVentasBetweenDates(): Response|ResponseFactory|RedirectResponse
    {
        if(request('start_date') && request('end_date')) {
            if(request('start_date') > request('end_date')){
                return redirect()->back()
                    ->with('error', [
                        'message' => 'La fecha de inicio no puede ser mayor a la fecha de fin.',
                        'key' => rand()
                    ]);
            }
        }

        $ventas = Venta::query();

        if(request('start_date')){
            $ventas->where('ventas.created_at', '>=', request('start_date'));
        }
        if (request('end_date')) {
            $ventas->where('ventas.created_at', '<=', request('end_date'));
        }

        return inertia('Admin/Statistics/VentasBetweenDates', [
            'ventas' => VentaResource::collection($ventas->get()),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Admin $admin)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Admin $admin)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
//    public function update(UpdateAdminRequest $request, Admin $admin)
//    {
//        //
//    }
}
