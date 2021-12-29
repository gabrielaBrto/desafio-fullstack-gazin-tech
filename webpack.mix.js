const mix = require('laravel-mix');
const path = require('path');

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
 mix.webpackConfig({
    resolve: {
      alias: {
        // '@material-ui/core/styles': '@mui/styles',
        '@material-ui/icons': '@mui/icons-material',
        // '@material-ui/core': '@mui/material',
        '@Root': path.resolve(
          __dirname,
  
          './resources/js/src',
        ),
        '@Components': path.resolve(
          __dirname,
  
          './resources/js/src/components',
        ),
        '@Hooks': path.resolve(
          __dirname,
  
          './resources/js/src/hooks',
        ),
        '@Routers': path.resolve(
          __dirname,
  
          './resources/js/src/routers',
        ),
        '@Api': path.resolve(
          __dirname,
  
          './resources/js/src/api',
        ),
        '@Utils': path.resolve(
          __dirname,
  
          './resources/js/src/utils',
        ),
      },
    },
  });
  
mix.js('resources/js/app.js', 'public/js')
    .react()
    .sass('resources/sass/app.scss', 'public/css');
