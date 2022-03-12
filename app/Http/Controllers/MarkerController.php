<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Marker;

class MarkerController extends Controller
{
    public function index(){
        $markers = Marker::all();
        return ['data'=> $markers];
    }
}
