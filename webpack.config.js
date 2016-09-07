var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var debug = process.env.NODE_ENV !== 'production'
module.exports = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080/',
        './src/js/main.js'
    ],
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: 'js/bundle.js',
        chunkFilename: 'js/[id].chunk.js',
        publicPath: debug ? '/dist/' : './' //运行时bundle文件项目路径
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("css/index.min.css", {allChunks: true}) //抽取css到单独文件index.css
    ],
    resolveLoader: {
        root: path.join(__dirname, 'node_modules'),
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader?presets[]=es2015',
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.html$/,
                loader: 'vue-html'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css', {publicPath: '../'})
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!sass', {publicPath: '../'})
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader?limit=10000&name=img/[hash:8].[name].[ext]'
            }
        ]
    },
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract('vue-style-loader', 'css-loader', 'sass-loader', {publicPath: '../'})
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.entry = ['./src/js/main.js']
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ])
}
