<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $custormers = [
            [
                "name" => "John doe",
                "phone" => "+3625641232",
                "address" => "Paris",
                "email" => "jd@gmail.com",
            ],
            [
                "name" => "Charlin Cap",
                "phone" => "+31 256 2313",
                "address" => "Londre",
                "email" => "ccl@gmail.com",
            ],
            [
                "name" => "Augustin Affognon",
                "phone" => "+22 325 1532",
                "address" => "Clermont-Ferrand",
                "email" => "boss@gmail.com",
            ],            

        ];

        DB::table('custormers')->insert($custormers);
    }
}
