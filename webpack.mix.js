const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

let url = process.env.APP_URL.replace(/(^\w+:|^)\/\//, '');
mix.options({
   hmrOptions: {
       host: url,
       port: 8080 // Can't use 443 here because address already in use
   }
});

mix.js('resources/js/app.js', 'public/js')
    .js('resources/js/login.js', 'public/js')
    .js('resources/js/caisse.js', 'public/js')
    .js('resources/js/admin.js', 'public/js')
    .js('resources/js/settings.js', 'public/js')
    .js('resources/js/payments.js', 'public/js')
    .react()
    .postCss('resources/css/app.css', 'public/css', [
        require('tailwindcss')
    ]);

console.log('Laravel Mix configuration completed.');
