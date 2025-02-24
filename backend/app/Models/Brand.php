<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{

    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'image'
    ];

    public static function boot()
    {
        parent::boot();
        static::creating(function ($brand) {
            $brand->slug = Str::slug($brand->name);
        });
    }
}
