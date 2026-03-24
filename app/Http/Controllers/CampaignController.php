<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use Illuminate\Http\Request;

class CampaignController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Campaign::latest()->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'content' => 'nullable|string',
            'status' => 'string|in:draft,scheduled,sent',
            'scheduled_at' => 'nullable|date',
        ]);

        return Campaign::create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(Campaign $campaign)
    {
        return $campaign;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Campaign $campaign)
    {
        $validated = $request->validate([
            'name' => 'string|max:255',
            'subject' => 'string|max:255',
            'content' => 'nullable|string',
            'status' => 'string|in:draft,scheduled,sent',
            'scheduled_at' => 'nullable|date',
        ]);

        $campaign->update($validated);

        return $campaign;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Campaign $campaign)
    {
        $campaign->delete();

        return response()->noContent();
    }
}
