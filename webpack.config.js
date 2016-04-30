var path = require('path');
var webpack = require('webpack');
var process = require('process');

module.exports = {
    entry: './assets/app.jsx',
    output: {path: 'static/js', filename: 'app.js'},
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'jshint-loader'
            }
        ],
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.coffee$/,
                loader: "coffee-loader"
            },
            {
                test: /\.(coffee\.md|litcoffee)$/,
                loader: "coffee-loader?literate"
            }
        ]
    },
    externals: {
        "jquery": "$",
        "react-dom": "ReactDOM",
        "react": "React"
    }
};
