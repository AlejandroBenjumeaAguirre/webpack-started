const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const CopyPlugins = require('copy-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    optimization: {
        minimizer: [ new OptimizeCssAssetsPlugin() ]
    },
    output: {
        filename: 'main.[contentHash].js'
    },
    module: {
        rules: [
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader" 
            },
            {
                test: /\.css$/,
                exclude: /style\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /style\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: true,
                },
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MinifyPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contentHash].css',
            ignoreOrder: false,
        }),
        new CopyPlugins({
            patterns: [
              {
                from: "src/assets",
                to: "assets/",
              },
            ],
          })
    ]
}