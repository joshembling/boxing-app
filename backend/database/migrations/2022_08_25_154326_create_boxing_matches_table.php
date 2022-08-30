<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('boxing_matches', function (Blueprint $table) {
            $table->id();
            $table->string('match_title', 255)->nullable();
            $table->string('boxer_1_name', 255)->nullable();
            $table->string('boxer_1_headshot', 1000)->nullable();
            $table->string('boxer_1_flag_img', 1000)->nullable();
            $table->string('boxer_1_flag_alt')->nullable();
            $table->string('boxer_1_record')->nullable();
            $table->string('boxer_2_name')->nullable();
            $table->string('boxer_2_headshot', 1000)->nullable();
            $table->string('boxer_2_flag_img', 1000)->nullable();
            $table->string('boxer_2_flag_alt')->nullable();
            $table->string('boxer_2_record')->nullable();
            $table->string('date')->nullable();
            $table->string('time')->nullable();
            $table->string('timezone')->nullable();
            $table->string('organisations_title')->nullable();
            $table->json('organisations_list')->nullable();
            $table->json('tv_title')->nullable();
            $table->json('tv_img')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('boxing_matches');
    }
};
