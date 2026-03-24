<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageUploadController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = Str::random(20) . '.' . $file->getClientOriginalExtension();
            
            // Store the file in the public disk under 'uploads' directory
            $path = $file->storeAs('uploads', $filename, 'public');
            
            // Return the full URL to the file
            return response()->json([
                'url' => asset('storage/' . $path),
            ]);
        }

        return response()->json(['error' => 'No file uploaded'], 400);
    }
}
