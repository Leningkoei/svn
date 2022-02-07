const path = require("path");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    // mode: "production",
    devServer: {
        port: "2048",
        historyApiFallback: true
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
                use: [ MiniCssExtractPlugin.loader, "css-loader" ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.(jpg|png)$/,
                type: "asset/resource"
            }
        ]
    }
};

