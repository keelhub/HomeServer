/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');

// PostCSS plugins
const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');

module.exports = require('./webpack.base')({
    // Add hot reloading in development
    entry: {
        main: path.join(process.cwd(), 'app/js/app.jsx'),
        comments: path.join(process.cwd(), 'app/js/comments.jsx')
    },

    // Don't use hashes in dev mode for better performance
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },

    // Load the CSS in a style tag in development
    cssLoaders: 'style-loader!css-loader?localIdentName=[local]__[path][name]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader',

    // Process the CSS with PostCSS
    postcssPlugins: [
        postcssFocus(), // Add a :focus to every :hover
        cssnext({ // Allow future CSS features to be used, also auto-prefixes the CSS...
            browsers: ['last 2 versions', 'IE > 10'] // ...based on this browser list
        }),
        postcssReporter({ // Posts messages from plugins to the terminal
            clearMessages: true
        })
    ],

    // Add hot reloading
    plugins: [
        new webpack.NoErrorsPlugin()
    ],

    // Emit a source map for easier debugging
    devtool: 'inline-source-map'
});

