<?php

use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\frontend\PostShowController;
use App\Http\Controllers\frontend\WelcomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProductController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/', WelcomeController::class);
Route::get('/posts/{post:slug}', PostShowController::class);

Route::apiResource('/dashboard/posts', PostController::class)
    ->middleware([
        'auth:sanctum'
    ])
    ->except(['create', 'edit']);
Route::apiResource('/dashboard/categories', CategoryController::class)
    ->middleware([
        'auth:sanctum'
    ])
    ->except(['create', 'edit']);;

Route::apiResource('/dashboard/products', ProductController::class)
    ->middleware([
        'auth:sanctum'
    ])
    ->except(['create', 'edit']);;
Route::apiResource('/dashboard/brands', BrandController::class);
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/users', function (Request $request) {
    return User::all();
});
Route::get('/403', function (Request $request) {
    return response()->json('unauthorized', 403);
});
