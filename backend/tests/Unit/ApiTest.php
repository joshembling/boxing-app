<?php

namespace Tests\Unit;

use Tests\TestCase;

class ApiTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_get_all_matches()
    {
        $response = $this->getJson('/api');

        return $response->assertStatus(200);
    }

    // public function test_get_singular_match()
    // {
    //     $response = $this->getJson('/api/matches');

    //     return $response->assertStatus(200);
    // }
}
