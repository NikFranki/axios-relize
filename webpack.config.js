const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

var config = {};

function generateConfig(env, argv) {
    const uglify = argv.mode === 'production';
    const name = uglify ? 'axios.min' : 'axios';

    const config = {
        entry: './index.js',
        output: {
            path: path.resolve(__dirname, 'dist/'),
            filename: name + '.js',
            sourceMapFilename: name + '.map',
            library: 'axios',
            libraryTarget: 'umd'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    },
                    include: [
                        path.resolve(__dirname, 'lib'),
                        path.resolve(__dirname, 'example')
                    ]
                }
            ]
        },
        node: {
            process: false
        },
        devtool: uglify ? 'source-map' : 'cheap-module-source-map',
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            })
        ],
        optimization: {
            minimizer: [new UglifyJsPlugin()],
        }
    };

    return config;
}

module.exports = generateConfig;