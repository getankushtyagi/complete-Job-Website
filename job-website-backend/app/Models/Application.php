<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;
    protected $table="applications";

    public function jobs(){
        return $this->belongsTo(Job::class,'job_id','id');
    }
    public function users(){
        return $this->hasMany(User::class,'id','candidate_id');
    }

}
