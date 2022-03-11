<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Admin',
            'email' => 'admin@api.com',
            'current_team_id' => '1',
            'role' => 'admin',
            'password' => Hash::make('admin'),
            'email_verified_at' => Carbon::now()->subDay()
        ]);

        DB::table('users')->insert([
            'name' => 'User',
            'email' => 'user@api.com',
            'current_team_id' => '2',
            'role' => 'user',
            'password' => Hash::make('user'),
            'email_verified_at' => Carbon::now()->subDay()
        ]);
    }
}
