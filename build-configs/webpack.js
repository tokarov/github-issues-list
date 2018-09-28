import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import WebpackChunkHash from 'webpack-chunk-hash';
import path from 'path';

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const root = path.resolve(__dirname, '../');

module.exports = {
    entry: {
        app: ['normalize.css', './app'],
        vendor: [
            'moment',
            'react',
            'react-dom',
            'react-redux',
            'react-router-dom',
            'redux',
            'reselect',
            'redux-thunk'
        ],
    },
    // devtool: 'cheap-module-source-map',
    devtool: 'eval',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
        publicPath: '/',
        chunkFilename: '[name].[hash].js'
    },
    resolve: {
        modules: ['app', 'node_modules'],
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(root, 'app'),
                exclude: path.resolve(root, 'node_modules'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: path.resolve(root, '.babelCache'),
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                loaders:
                    [
                        'style-loader',
                        'css-loader',
                        'postcss-loader'
                    ]
            },
            {
                test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                loader:
                    'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /.(jpg|png)$/,
                loader:
                    'file-loader?name=images/[name].[ext]'
            },
            {
                test: /\.svg$/,
                exclude:
                    /node_modules/,
                loader:
                    'svg-react-loader'
            }

        ]
    },
    optimization: {
        namedModules: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new UglifyJSPlugin({
            parallel: true,
            sourceMap: true
        }),
        new WebpackChunkHash(),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),

        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)

        // new BundleAnalyzerPlugin({
        //   analyzerMode: 'server',
        //   analyzerHost: '127.0.0.1',
        //   analyzerPort: 8889,
        //   reportFilename: 'report.html',
        //   defaultSizes: 'parsed',
        //   openAnalyzer: true,
        //   generateStatsFile: false,
        //   statsFilename: 'stats.json',
        //   statsOptions: null,
        //   logLevel: 'info',
        // }),
    ]
}
;
