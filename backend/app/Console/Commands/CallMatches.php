<?php

namespace App\Console\Commands;

use Goutte\Client;
use App\Models\BoxingMatch;

use Illuminate\Console\Command;

use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpClient\HttpClient;

require 'vendor/autoload.php';

class CallMatches extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'call:matches';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Call latest boxing matches';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $goutte = new Client();
        $crawler = $goutte->request('GET', 'https://box.live/upcoming-fights-schedule/');

        // $client = new Client(HttpClient::create(['timeout' => 60]));
        // $news = $crawler->filter('.fight-card__footer > a')->text();
        // $link = $crawler->selectLink($news)->link();
        // $crawler = $client->click($link);
        // $place = $crawler->filter('.fight-place')->text();
        // $full_weight_title = $crawler->filter('.single-fight__weight-class > span')->text();
        // $weight_class = $crawler->filter('.single-fight__weight-class > span > span:last-of-type')->text();



        $data = $crawler->filter('.fight-card')->each(function ($fightCard) {
            $title = $fightCard->filter('.fighters-names .fighters-names__item')->each(function ($name) {

                return $name->text();
            });

            // NAMES
            $names = $fightCard->filter('.fighters-names .fighters-names__item')->each(function ($name) {
                if ($name->filter('a')->count() > 0) {
                    return $name->filter('a')->attr('title');
                } else {
                    return $name->text();
                }
            });

            // HEADSHOTS
            $headshots = $fightCard->filter('.fight-card__fighters .fight-card__photo')->each(function ($headshot) {
                if ($headshot->filter('a > img')->count() > 0) {
                    return $headshot->filter('a > img')->attr('data-src');
                }
            });

            // FLAGS
            $flags = $fightCard->filter('.fight-card__flag')->each(function ($flag) {
                if ($flag->filter('img')->count() > 0) {
                    return [
                        'img' => $flag->filter('img')->attr('data-src'),
                        'alt' => $flag->filter('img')->attr('alt') ? $flag->filter('img')->attr('alt') : 'flag'
                    ];
                }
            });

            // RECORDS
            $records = $fightCard->filter('.flex-grow-1.w-100 .stats-row .stats-row__content')->each(function ($record) {
                return $record->text();
            });

            // MATCH DATA
            $date = $fightCard->filter('.flex-grow-1.w-100 .fight-card__date .date')->text();
            $time = $fightCard->filter('.flex-grow-1.w-100 .fight-card__date .day .determine-tz .localtime')->text();
            $timezone = $fightCard->filter('.flex-grow-1.w-100 .fight-card__date .day .determine-tz .tzone > .tz_info')->text();

            // ORGANISATION DATA
            $organisations_title = $fightCard->filter('.fight-card__orgs .title')->count() > 0 ? $fightCard->filter('.fight-card__orgs .title')->text() : '';
            $organisations = $fightCard->filter('.fight-card__orgs .d-flex.w-100 .fight-card__org')->each(function ($org) {
                if ($org->count() > 0) {
                    return $org->text();
                }
            });

            // TV DATA
            $tv = $fightCard->filter('.fight-card__tv-shows .fight-card__tv-shows-list')->each(function ($tv) {
                $title = $tv->filter('.title')->text();
                if ($tv->filter('div .fight-card__tv-show > a img')->count() > 0) {
                    $img = $tv->filter('div .fight-card__tv-show > a img')->attr('data-src');

                    return ['title' => $title, 'img' => $img];
                }

                return ['title' => $title, 'img' => null];
            });

            $tv_title = [];
            $tv_img = [];

            foreach ($tv as $t) {
                $tv_title[] = $t['title'];
                $tv_img[] = $t['img'];
            };

            $tv = ['title' => $tv_title, 'img' => $tv_img];


            /** VENUE && WEIGHT CLASS */
            $client = new Client(HttpClient::create(['timeout' => 60]));
            $singleFight = $fightCard->filter('.fight-card__footer > a')->text();
            $link = $fightCard->selectLink($singleFight)->link();
            $crawler = $client->click($link);
            $place = $crawler->filter('.fight-place')->text();
            $full_weight_title = $crawler->filter('.single-fight__weight-class > span')->text();
            $weight_class = $crawler->filter('.single-fight__weight-class > span > span:last-of-type')->text();

            /** URI */
            $matchTitle = $title[0] . ' v ' . $title[1];
            $formatted_time = date('Y-m', strtotime($time));

            $formatted_slug = strtolower(str_replace(' ', '-', $matchTitle)) . '-' . $formatted_time;

            return [
                'names' => $names,
                'surnames' => [$title[0], $title[1]],
                'headshots' => $headshots,
                'flags' => $flags,
                'records' => $records,
                'match_data' => [
                    'match_title' => $matchTitle,
                    'slug' => $formatted_slug,
                    'date' => $date,
                    'time' => $time,
                    'timezone' => $timezone,
                    'organisations' => [
                        'title' => $organisations_title,
                        'organisations' => $organisations
                    ],
                    'tv' => $tv,
                    'venue' => $place,
                    'full_weight_title' => $full_weight_title,
                    'weight_class' => trim(strstr($weight_class, ' ')),
                ]
            ];
        });


        $matches = [];

        foreach ($data as $d) {
            // $d[0][0], $d[0][1]
            $boxer_data1 = [0 => [
                'name' => $d['names'][0],
                'surname' => $d['surnames'][0],
                'headshot' => $d['headshots'][0],
                'flag' => $d['flags'][0],
                'record' => $d['records'][0]
            ]];
            $boxer_data2 = [1 => [
                'name' => $d['names'][1],
                'surname' => $d['surnames'][1],
                'headshot' => $d['headshots'][1],
                'flag' => $d['flags'][1],
                'record' => $d['records'][1]
            ]];
            $boxer_data = array_merge($boxer_data1, $boxer_data2);

            $match_data = [];

            $matches[] = ['boxers' => $boxer_data, 'match_data' => $d['match_data']];
        }

        foreach ($matches as $m) {

            $BoxingMatch = BoxingMatch::where('boxer_1_name', $m['boxers'][0]['name'])
                ->where('boxer_2_name', $m['boxers'][1]['name'])
                ->where('date', $m['match_data']['date'])
                ->first();

            if ($BoxingMatch) {
                $BoxingMatch->match_title = $m['match_data']['match_title'] ?? null;
                $BoxingMatch->slug = $m['match_data']['slug'] ?? null;

                // BOXER 1
                $BoxingMatch->boxer_1_name = $m['boxers'][0]['name'] ?? null;
                $BoxingMatch->boxer_1_surname = $m['boxers'][0]['surname'] ?? null;
                $BoxingMatch->boxer_1_headshot = $m['boxers'][0]['headshot'] ?? null;
                $BoxingMatch->boxer_1_flag_img = $m['boxers'][0]['flag']['img'] ?? null;
                $BoxingMatch->boxer_1_flag_alt = $m['boxers'][0]['flag']['alt'] ?? null;
                $BoxingMatch->boxer_1_record = $m['boxers'][0]['record'] ?? null;

                // BOXER 2
                $BoxingMatch->boxer_2_name = $m['boxers'][1]['name'] ?? null;
                $BoxingMatch->boxer_2_surname = $m['boxers'][1]['surname'] ?? null;
                $BoxingMatch->boxer_2_headshot = $m['boxers'][1]['headshot'] ?? null;
                $BoxingMatch->boxer_2_flag_img = $m['boxers'][1]['flag']['img'] ?? null;
                $BoxingMatch->boxer_2_flag_alt = $m['boxers'][1]['flag']['alt'] ?? null;
                $BoxingMatch->boxer_2_record = $m['boxers'][1]['record'] ?? null;

                // BOXING MATCH DATA
                $BoxingMatch->date = $m['match_data']['date'] ?? null;
                $BoxingMatch->time = $m['match_data']['time'] ?? null;
                $BoxingMatch->timezone = $m['match_data']['timezone'] ?? null;
                $BoxingMatch->organisations_title = $m['match_data']['organisations']['title'] ?? null;
                $BoxingMatch->update(['organisations_list' => $m['match_data']['organisations']['organisations']]) ?? null;
                $BoxingMatch->update(['tv_title' => $m['match_data']['tv']['title']]) ?? null;
                $BoxingMatch->update(['tv_img' => $m['match_data']['tv']['img']]) ?? null;
                $BoxingMatch->venue = $m['match_data']['venue'] ?? null;
                $BoxingMatch->full_weight_title = $m['match_data']['full_weight_title'] ?? null;
                $BoxingMatch->weight_class = $m['match_data']['weight_class'] ?? null;
                $BoxingMatch->save();
            } else {
                $BoxingMatch = new BoxingMatch();
                $BoxingMatch->match_title = $m['match_data']['match_title'];
                $BoxingMatch->slug = $m['match_data']['slug'] ?? null;

                // BOXER 1
                $BoxingMatch->boxer_1_name = $m['boxers'][0]['name'] ?? null;
                $BoxingMatch->boxer_1_surname = $m['boxers'][0]['surname'] ?? null;
                $BoxingMatch->boxer_1_headshot = $m['boxers'][0]['headshot'] ?? null;
                $BoxingMatch->boxer_1_flag_img = $m['boxers'][0]['flag']['img'] ?? null;
                $BoxingMatch->boxer_1_flag_alt = $m['boxers'][0]['flag']['alt'] ?? null;
                $BoxingMatch->boxer_1_record = $m['boxers'][0]['record'] ?? null;

                // BOXER 2
                $BoxingMatch->boxer_2_name = $m['boxers'][1]['name'] ?? null;
                $BoxingMatch->boxer_2_surname = $m['boxers'][1]['surname'] ?? null;
                $BoxingMatch->boxer_2_headshot = $m['boxers'][1]['headshot'] ?? null;
                $BoxingMatch->boxer_2_flag_img = $m['boxers'][1]['flag']['img'] ?? null;
                $BoxingMatch->boxer_2_flag_alt = $m['boxers'][1]['flag']['alt'] ?? null;
                $BoxingMatch->boxer_2_record = $m['boxers'][1]['record'] ?? null;

                // BOXING MATCH DATA
                $BoxingMatch->date = $m['match_data']['date'] ?? null;
                $BoxingMatch->time = $m['match_data']['time'] ?? null;
                $BoxingMatch->timezone = $m['match_data']['timezone'] ?? null;
                $BoxingMatch->organisations_title = $m['match_data']['organisations']['title'] ?? null;
                // $BoxingMatch->organisations_list = json_encode($m['match_data']['organisations']['organisations']) ?? null;
                // $BoxingMatch->tv_title = json_encode($m['match_data']['tv']['title']);
                // $BoxingMatch->tv_img = json_encode($m['match_data']['tv']['img']);
                // $BoxingMatch->venue = $m['match_data']['venue'] ?? null;
                // $BoxingMatch->full_weight_title = $m['match_data']['full_weight_title'] ?? null;
                // $BoxingMatch->weight_class = $m['match_data']['weight_class'] ?? null;
                $BoxingMatch->update(['organisations_list' => $m['match_data']['organisations']['organisations']]) ?? null;
                $BoxingMatch->update(['tv_title' => $m['match_data']['tv']['title']]) ?? null;
                $BoxingMatch->update(['tv_img' => $m['match_data']['tv']['img']]) ?? null;
                $BoxingMatch->venue = $m['match_data']['venue'] ?? null;
                $BoxingMatch->full_weight_title = $m['match_data']['full_weight_title'] ?? null;
                $BoxingMatch->weight_class = $m['match_data']['weight_class'] ?? null;
                $BoxingMatch->save();
            }
        }
    }
}
