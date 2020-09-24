const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const commonConfig = require('./common.config');

module.exports = {
    ...commonConfig,
    target: 'web',
    entry: './src/client/index.tsx',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'assets/js/bundle.js',
        publicPath: '/',
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{ from: './src/client/public', to: './' }],
        }),
        new HtmlWebPackPlugin({
            template: 'src/client/index.ejs',
            filename: 'index.html',
            inject: 'body',
        }),
    ],
};
