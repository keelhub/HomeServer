var path = require('path');
var webpack = require('webpack');


module.exports = {
    entry: {
        main: './assets/app.jsx',
        test: './assets/test.coffee'
    },
    output: {
        path: path.join(__dirname, 'static/js'),
        filename: '[name].js'
    },
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
