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

        $matches = [];

        foreach (BoxingMatch::all() as $match) {
            // new JSON structure
            $json = [
                'id' => $match->id,
                'match_title' => $match->match_title,
                'slug' => $match->slug,
                'boxer_1' => [
                    'name' => $match->boxer_1_name,
                    'surname' => $match->boxer_1_surname,
                    'headshot' => $match->boxer_1_headshot,
                    'flag' => [
                        'img' => $match->boxer_1_flag_img,
                        'alt' => $match->boxer_1_flag_alt
                    ],
                    'record' => $match->boxer_1_record,
                ],
                'boxer_2' => [
                    'name' => $match->boxer_2_name,
                    'surname' => $match->boxer_2_surname,
                    'headshot' => $match->boxer_2_headshot,
                    'flag' => [
                        'img' => $match->boxer_2_flag_img,
                        'alt' => $match->boxer_2_flag_alt
                    ],
                    'record' => $match->boxer_2_record,
                ],
                'date' => $match->date,
                'time' => $match->time,
                'timezone' => $match->timezone,
                'organisations_title' => $match->organisations_title,
                'organisations_list' => $match->organisations_list,
                'tv_title' => $match->tv_title,
                'tv_img' => $match->tv_img,
                'venue' => $match->venue,
                'full_weight_title' => $match->full_weight_title,
                'weight_class' => $match->weight_class,
            ];

            $matches[] = $json;
        };

        return $matches;
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
        $match = BoxingMatch::where('slug', '=', $slug)->first();

        $json = [
            'id' => $match->id,
            'match_title' => $match->match_title,
            'slug' => $match->slug,
            'boxer_1' => [
                'name' => $match->boxer_1_name,
                'surname' => $match->boxer_1_surname,
                'headshot' => $match->boxer_1_headshot,
                'flag' => [
                    'img' => $match->boxer_1_flag_img,
                    'alt' => $match->boxer_1_flag_alt
                ],
                'record' => $match->boxer_1_record,
            ],
            'boxer_2' => [
                'name' => $match->boxer_2_name,
                'surname' => $match->boxer_2_surname,
                'headshot' => $match->boxer_2_headshot,
                'flag' => [
                    'img' => $match->boxer_2_flag_img,
                    'alt' => $match->boxer_2_flag_alt
                ],
                'record' => $match->boxer_2_record,
            ],
            'date' => $match->date,
            'time' => $match->time,
            'timezone' => $match->timezone,
            'organisations_title' => $match->organisations_title,
            'organisations_list' => $match->organisations_list,
            'tv_title' => $match->tv_title,
            'tv_img' => $match->tv_img,
            'venue' => $match->venue,
            'full_weight_title' => $match->full_weight_title,
            'weight_class' => $match->weight_class,
        ];

        return $json;
    }
}
