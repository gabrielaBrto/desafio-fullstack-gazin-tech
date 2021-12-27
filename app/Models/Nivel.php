<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Nivel extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'niveis';

    protected $fillable = ['nivel'];

    public function desenvolvedor(){
        return $this->hasOne(Desenvolvedor::class);
    }
}
