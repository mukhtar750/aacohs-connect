<?php

namespace App\Http\Controllers;

use App\Models\Subscriber;
use Illuminate\Http\Request;

class SubscriberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Subscriber::latest()->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:subscribers,email',
            'first_name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'status' => 'string|in:active,unsubscribed,bounced',
            'tags' => 'nullable|array',
        ]);

        return Subscriber::create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(Subscriber $subscriber)
    {
        return $subscriber;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Subscriber $subscriber)
    {
        $validated = $request->validate([
            'email' => 'email|unique:subscribers,email,' . $subscriber->id,
            'first_name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'status' => 'string|in:active,unsubscribed,bounced',
            'tags' => 'nullable|array',
        ]);

        $subscriber->update($validated);

        return $subscriber;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subscriber $subscriber)
    {
        $subscriber->delete();

        return response()->noContent();
    }
}
