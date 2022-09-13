const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname,'client/index.js'),

    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'bundle.js',
    },

    mode: process.env.NODE_ENV,
    
    devServer: {
        static: {
            directory: path.join(__dirname, './build'),
        },
        proxy: {
            '/': `http://localhost:3000/`,
        }
    },

    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', `@babel/preset-react`]
                    }
                }
            },
            {
                test: /\.s?css/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ],
    },
    plugins: [new HtmlWebpackPlugin({
        template: './client/index.html',
      })],
};
