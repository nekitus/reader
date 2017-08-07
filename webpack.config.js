var path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    watch: true,
    devtool: "eval",
    module: {

        rules: [
/*            {
                test: /\.jsx$/,
                enforce: "pre",
                loader: 'eslint-loader',
                include: [
                    path.resolve(__dirname, 'src')
                ]
            },*/
            {
                rules: [
                    {
                        test: /\.css$/,
                        use: [ 'style-loader', 'css-loader' ]
                    }
                ]
            },
            //{
            //    test: /\.js$/,
            //    loaders: ['react-hot-loader/webpack', 'babel']
            //},
            {
                //use: [
                //    'react-hot-loader'
                //],
                include: [
                    path.resolve(__dirname, 'src')
                ],
                test: /\.jsx$/
            },
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                exclude: /node_modules\/(?!other-module)/,
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: ['transform-decorators-legacy' ,'transform-runtime']
                }
            }
        ]
    }
};