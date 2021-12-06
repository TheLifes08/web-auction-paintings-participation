const nodeExternals = require("webpack-node-externals");

module.exports = {
    entry: {
        server: './src/index.js',
    },
    output: {
        filename: "./[name].js"
    },
    target: 'node',
    node: {
        __dirname: true,
        __filename: true,
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
}