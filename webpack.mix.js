const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .postCss('resources/css/app.css', 'public/css', [
        require('postcss-import'),
        require('tailwindcss')
    ])
    .css('resources/css/animations.css', 'public/css')
    .css('resources/css/general.css', 'public/css')
    .css('resources/css/popup.css', 'public/css')
    .css('resources/css/style.css', 'public/css')
    .combine([
        'resources/js/functions.js',
        'resources/js/views.js',
        'resources/js/map.js',
        'resources/js/getToken.js',
        'resources/js/showPopup.js'
    ], 'public/js/app.js');

if (mix.inProduction()) {
    mix.version();
}