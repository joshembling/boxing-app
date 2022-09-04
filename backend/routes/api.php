<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BoxingMatchController;

// header('Access-Control-Allow-Origin: *');
// //Access-Control-Allow-Origin: *
// header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, DELETE');
// header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Origin, Authorization');

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
// 	return $request->user();
// });

Route::post('/register', [AuthController::class, 'register']);

Route::group(['middleware' => ['auth:sanctum']], function () {
	// Route::get('/', [BoxingMatchController::class, 'index']);
	// Route::get('/matches/{slug}', [BoxingMatchController::class, 'show']);
});

Route::get('/', [BoxingMatchController::class, 'index']);
Route::get('/test', function () {
	// $root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';
	$url = 'https://box.live/wp-content/themes/BoxLive%20Theme/assets/images/flags/us.svg';
	$name = substr($url, strrpos($url, '/') + 1);
	echo '<pre>';
	var_dump($name);
	var_dump(str_contains(Storage::url('public/flags/' . 'us' . '.svg'), $name));
	echo '</pre>';
});
Route::get('/matches/{slug}', [BoxingMatchController::class, 'show']);
