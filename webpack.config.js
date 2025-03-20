const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js", // Entry point
    output: {
        path: path.resolve(__dirname, "dist"), // Output directory
        filename: "index.bundle.js",
        publicPath: "/", // ✅ Important for React Router
    },
    devServer: {
        port: 3002,
        open: true,
        hot: true,
        static: path.resolve(__dirname, "dist"),
        historyApiFallback: true, // ✅ Fixes 404 issues on refresh
    },
    module: {
        rules: [
            {
                test: /\.js(x?)$/, // Match JS and JSX
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
};
