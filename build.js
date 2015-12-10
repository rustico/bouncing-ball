var minifier = require('minifier')
minifier.minify(['./src/utils.js',
                 './src/site.js',
                 './src/ball.js'],
                {
                    output: './public/site.js'
                });

minifier.minify(['./src/style.css'],
                {
                    output: './public/style.css'
                });


var fs = require('fs');
fs.createReadStream('./src/index.html')
    .pipe(fs.createWriteStream('./public/index.html'));

var open = require('open');
open('./public/index.html');
