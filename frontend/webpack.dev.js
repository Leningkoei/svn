const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const dev = {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        port: "2048",
        historyApiFallback: true
    }
};

module.exports = merge(common, dev);

