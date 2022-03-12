<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('markers');
        Schema::create('markers', function (Blueprint $table) {
            $table->increments('id');
            $table->float('long', 14, 12);
            $table->float('lat', 14, 12);
            $table->string('name', 100);
            $table->string('street', 121);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('markers');
    }
};
