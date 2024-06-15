<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Admin;
use App\Models\Trueque;
use App\Models\User;
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
            ->joinSub($userCounts, 'union_subquery', function ($join) {
                $join->on('users.id', '=', 'union_subquery.user_id');
            })
            ->select('users.*', 'union_subquery.total as total_trueques')
            ->get();

        return inertia('Admin/Statistics/MostTruequesUsers', [
            'users' => UserResource::collection($users),
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
