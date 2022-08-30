<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BoxingMatch extends Model
{
    use HasFactory;

    protected $fillable = [
        'organisations_list',
        'tv_title',
        'tv_img'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'organisations_list' => 'array',
        'tv_title' => 'array',
        'tv_img' => 'array',
    ];
}
