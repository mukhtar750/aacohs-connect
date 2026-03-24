<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CampaignController;
use App\Http\Controllers\SubscriberController;
use App\Http\Controllers\TemplateController;
use App\Http\Controllers\ImageUploadController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Landing');
});

Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/dashboard/campaigns', function () {
        return Inertia::render('Campaigns');
    });

    Route::get('/dashboard/subscribers', function () {
        return Inertia::render('Subscribers');
    });

    Route::get('/dashboard/templates', function () {
        return Inertia::render('Templates');
    });

    Route::get('/dashboard/builder', function () {
        return Inertia::render('EmailBuilder');
    });

    Route::get('/dashboard/analytics', function () {
        return Inertia::render('Analytics');
    });

    Route::get('/dashboard/settings', function () {
        return Inertia::render('DashboardSettings');
    });

    // API-like routes for Inertia/React consumption
    Route::apiResource('api/campaigns', CampaignController::class);
    Route::apiResource('api/subscribers', SubscriberController::class);
    Route::apiResource('api/templates', TemplateController::class);
    Route::post('api/upload-image', [ImageUploadController::class, 'store']);
});
