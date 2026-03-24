<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscriber extends Model
{
    protected $fillable = [
        'email',
        'first_name',
        'last_name',
        'status',
        'tags',
    ];

    protected $casts = [
        'tags' => 'array',
    ];
}
