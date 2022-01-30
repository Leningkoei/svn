const path = require("path");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    // mode: "production",
    devServer: {
        static: "./dist"
    },
    entry: "./src/index.js",
    resolve: {
        mainFiles: [ "index" ],
        extensions: [ ".js", ".jsx" ]
    },
    output: {
        filename: "index.js",
        publicPath: "/",
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./public/index.html",
            favicon: "./public/favicon.ico",
        }),
        new MiniCssExtractPlugin({
        })
    ],
    optimization: {
        minimizer: [
            "...",
            new CssMinimizerPlugin()
        ]
    },
    module: {
        rules: [
            {
                test: /\.m?jsx?$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [ "@babel/preset-env" ]
                    }
                }
            },
            {
                test: /\.css$/,
                // use: [ "style-loader", "css-loader" ]
                use: [ MiniCssExtractPlugin.loader, "css-loader" ]
            },
            {
                test: /\.scss$/,
                // use: [ "style-loader", "css-loader", "sass-loader" ]
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    }
};

