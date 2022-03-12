<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class MarkerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('markers')->insert([
            'long' => 46.85046675589393,
            'lat' => -71.24708614046709,
            'name' => 'Tracteur de Chez Biceps BBQ',
            'street' => 'Biceps BBQ - Boulevard Henri-Bourassa',
            'created_at' => Carbon::now()
        ]);
        DB::table('markers')->insert([
            'long' => 46.85215722768032,
            'lat' => -71.2403156404298,
            'name' => 'Entrée du Parc de l\'Oise',
            'street' => 'Parc de l\'Oise',
            'created_at' => Carbon::now()
        ]);
        DB::table('markers')->insert([
            'long' => 46.85046675589393,
            'lat' => -71.24708614046709,
            'name' => 'Monument du Club des Lions',
            'street' => 'Jonction Boulevard Henri-Bourassa et 3e Avenue E',
            'created_at' => Carbon::now()
        ]);
        DB::table('markers')->insert([
            'long' => 46.851955657095324,
            'lat' => -71.24779437277681,
            'name' => 'Ma maison',
            'street' => 'Boulevard Henri-Bourassa',
            'created_at' => Carbon::now()
        ]);
        DB::table('markers')->insert([
            'long' => 46.854116216946345,
            'lat' => -71.25062160686107,
            'name' => 'Les jardins',
            'street' => '60e Rue E',
            'created_at' => Carbon::now()
        ]);
        DB::table('markers')->insert([
            'long' => 46.8544732716788,
            'lat' => -71.24216607922094,
            'name' => 'Vue sur Québec',
            'street' => 'Parc de l\'Oise',
            'created_at' => Carbon::now()
        ]);
    }
}
