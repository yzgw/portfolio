const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    return {
        mode: argv.mode || "production",
        entry: "./src/ts/script.ts",
        output: {
            path: path.join(__dirname, "./dist"),
            filename: "js/script.js"
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: "ts-loader"
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: { url: false }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        ["autoprefixer", { grid: true }],
                                    ],
                                },
                            },
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: [".ts", ".js"]
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    {
                        from: path.join(__dirname, "./src/index.html"),
                        to: path.join(__dirname, "./dist/index.html")
                    },
                    {
                        from: path.join(__dirname, "./src/image"),
                        to: path.join(__dirname, "./dist/image")
                    }
                ]
            }),
            new CleanWebpackPlugin(),
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, "dist"),
                serveIndex: true,
            },
            compress: true,
            port: 9000,
        },
        performance: {
            maxAssetSize: 100000000,
        },
    }
};
