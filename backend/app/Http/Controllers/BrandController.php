<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Resources\BrandResource;
use Illuminate\Support\Facades\Storage;
use PhpParser\Node\Stmt\TryCatch;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return BrandResource::collection(Brand::orderBy('created_at', 'desc')->get());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:brands|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $data = $request->all();
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
        }
        $brand = Brand::create($data);
        return new BrandResource($brand);
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        return new BrandResource($brand);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand) {}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Brand $brand)
    {
        // Validate incoming data
        $request->validate([
            'name' => 'required|unique:brands,name,' . $brand->id . '|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Log incoming request data to check if everything is correct
        Log::info('Update request data: ', $request->all());

        $data = $request->all();

        // Handle image upload if a new image is provided
        if ($request->hasFile('image')) {
            // Check if the current image exists and delete it
            if ($brand->image && Storage::disk('public')->exists($brand->image)) {
                Storage::disk('public')->delete($brand->image);
            }

            // Store the new image
            $data['image'] = $request->file('image')->store('brands', 'public');
        }

        // Update the slug if the name has changed
        if (isset($data['name']) && $data['name'] !== $brand->name) {
            $data['slug'] = Str::slug($data['name']);
        }

        // Update the brand data
        $brand->update($data);

        // Log the updated data to verify
        Log::info('Updated brand data: ', $brand->toArray());

        // Return the updated brand as a resource
        return new BrandResource($brand);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        try {
            if ($brand->image) {
                Storage::disk('public')->delete($brand->image);
            }
            $brand->delete();
            return response()->json(['message' => 'Brand deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server error'], 500);
        }
    }
}
