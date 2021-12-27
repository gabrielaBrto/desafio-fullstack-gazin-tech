<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Desenvolvedor extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'desenvolvedores';

    protected $fillable = [
        'nivel_id',
        'nome',
        'sexo',
        'datanascimento',
        'idade',
        'hobby'
    ];

    public function nivel(){
        return $this->belongsTo(Nivel::class, 'nivel_id');
    }
}
