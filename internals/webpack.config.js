const path = require('path');


module.exports = {
    entry: {
        comments: './assets/comments.jsx',
        test: './assets/test.coffee'
    },
    output: {
        path: path.join(__dirname, 'static/js'),
        filename: '[name].js'
    },
    module: {
        // preLoaders: [
        //     {
        //         test: /\.js$/,
        //         exclude: /node_modules/,
        //         loader: 'jshint-loader'
        //     }
        // ],
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
                loader: 'coffee-loader'
            },
            {
                test: /\.(coffee\.md|litcoffee)$/,
                loader: 'coffee-loader?literate'
            }
        ]
    },
    externals: {
        jquery: '$',
        'react-dom': 'ReactDOM',
        react: 'React'
    }
};
