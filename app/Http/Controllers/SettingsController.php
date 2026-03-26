<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        $settings = Setting::pluck('value', 'key')->toArray();
        return Inertia::render('DashboardSettings', [
            'initialSettings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'sender_name' => 'nullable|string',
            'sender_email' => 'nullable|email',
            'track_opens' => 'nullable|boolean',
            'track_clicks' => 'nullable|boolean',
            'auto_unsubscribe' => 'nullable|boolean',
            'smtp_host' => 'nullable|string',
            'smtp_port' => 'nullable|string',
            'smtp_encryption' => 'nullable|string',
            'smtp_password' => 'nullable|string',
            'smtp_username' => 'nullable|string',
        ]);

        foreach ($validated as $key => $value) {
            Setting::set($key, $value);
        }

        return redirect()->back()->with('success', 'Settings saved successfully.');
    }
}
