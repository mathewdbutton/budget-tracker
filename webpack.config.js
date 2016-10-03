var webpack = require("webpack");
var path = require("path");
const merge = require('webpack-merge');
const DotenvPlugin = require('webpack-dotenv-plugin');

const common = {
    // entry point of our application
    entry: ['./main.js'],
    // where to place the compiled bundle
    output: {
        path: __dirname,
        filename: 'build.js'
    },
    resolve: {
        extensions: ['', '.js', '.vue']
    },
    module: {
        // `loaders` is an array of loaders to use.
        // here we are only configuring vue-loader
        loaders: [{
            test: /\.vue$/, // a regex for matching all files that end in `.vue`
            loader: 'vue', // loader to use for matched files
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            loaders: ["style", "css", "sass"]
        }, {
            // use babel-loader for *.js files
            test: /\.js$/,
            loader: 'babel',
            // important: exclude files in node_modules
            // otherwise it's going to be really slow!
            exclude: /node_modules/
        }]
    },
    // if you are using babel-loader directly then
    // the babel config block becomes required.
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    }
};

var config;
// Detect how npm is run and branch based on that
switch (process.env.npm_lifecycle_event) {
    case 'test':
    /* We want to use a different env file for testing */
        config = merge(common, {
            plugins: [new DotenvPlugin({
                sample: './.env.default',
                path: './.env.test'
            })]
        });
        break;
    default:
        config = merge(common, {
            plugins: [new DotenvPlugin()]
        });
}

module.exports = config;
