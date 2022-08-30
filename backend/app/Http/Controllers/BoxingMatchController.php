<?php

namespace App\Http\Controllers;

use App\Models\BoxingMatch;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreBoxingMatchRequest;
use App\Http\Requests\UpdateBoxingMatchRequest;

class BoxingMatchController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $matches = DB::table('boxing_matches')
        //     ->select('boxing_matches.*')
        //     ->orderBy('time')
        //     ->get()
        //     ->transform(function ($obj) {
        //         return tap($obj, function ($o) {
        //             $o->organisations_list = json_decode($o->organisations_list);
        //             $o->tv_title = json_decode($o->tv_title);
        //             $o->tv_img = json_decode($o->tv_img);
        //         });
        //     });;

        // return $matches;

        return BoxingMatch::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreBoxingMatchRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBoxingMatchRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\BoxingMatch  $boxingMatch
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        // print_r($slug);
        return BoxingMatch::where('slug', '=', $slug)->first();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\BoxingMatch  $boxingMatch
     * @return \Illuminate\Http\Response
     */
    public function edit(BoxingMatch $boxingMatch)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateBoxingMatchRequest  $request
     * @param  \App\Models\BoxingMatch  $boxingMatch
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateBoxingMatchRequest $request, BoxingMatch $boxingMatch)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\BoxingMatch  $boxingMatch
     * @return \Illuminate\Http\Response
     */
    public function destroy(BoxingMatch $boxingMatch)
    {
        //
    }
}
