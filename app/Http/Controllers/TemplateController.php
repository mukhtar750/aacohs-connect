<?php

namespace App\Http\Controllers;

use App\Models\Template;
use Illuminate\Http\Request;

class TemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Template::latest()->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'html_content' => 'nullable|string',
            'thumbnail' => 'nullable|string',
            'category' => 'nullable|string',
        ]);

        return Template::create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(Template $template)
    {
        return $template;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Template $template)
    {
        $validated = $request->validate([
            'name' => 'string|max:255',
            'description' => 'nullable|string',
            'html_content' => 'nullable|string',
            'thumbnail' => 'nullable|string',
            'category' => 'nullable|string',
        ]);

        $template->update($validated);

        return $template;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Template $template)
    {
        $template->delete();

        return response()->noContent();
    }
}
