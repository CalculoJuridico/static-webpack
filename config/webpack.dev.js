const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const utils = require('./utils');
const config = require('./global.config');

module.exports = {
    entry: config.entry,
    mode: 'development',
    devServer: {
        contentBase: config.dev.contentBase,
        compress: config.dev.compress,
        clientLogLevel: 'error',
        stats: 'errors-only',
        // Pretty urls
        historyApiFallback: {
            rewrites: utils.rewrites()
        }
    },
    devtool: config.dev.devtool,
    resolve: {
        alias: {
            'img': utils.resolve('src/assets/img'),
            'media': utils.resolve('src/assets/media'),
            'assets': utils.resolve('src/assets'),
            '@': utils.resolve('src/scripts'),
            'styles': utils.resolve('src/styles')
        }
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                include: [
                    config.dev.sourceDirectory, // + any other paths that need to be transpiled
                    /\/node_modules\/smooth-scrolling/
                ],
                use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    },
                    'webpack-module-hot-accept'
                ]
            },
            {
                test: /\.(pug|jade)$/,
                use: [{
                    loader: 'pug-loader',
                    options: {
                        pretty: true
                    }
                }]
            },
            {
                test: /\.(handlebars|hbs)$/,
                loader: 'handlebars-loader',
                options: {
                    partialDirs: [
                        (config.dev.htmlSubDirectory + '../partials'),
                        (config.dev.htmlSubDirectory + '../helpers'),
                        (config.dev.htmlSubDirectory + '../includes')
                    ]
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            // CSS (except modules)
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: false,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: loader => [
                                require('autoprefixer'),
                                require('postcss-pxtorem')({
                                    propList: ['*'],
                                    mediaQuery: true
                                })
                            ]
                        }
                    },
                    {
                      loader: 'resolve-url-loader',
                      options: {
                          sourceMap: true
                      }
                    }
                ]
            },
            // CSS Modules
            {
                test: /\.module.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                            modules: true,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: loader => [
                                require('autoprefixer'),
                                require('postcss-pxtorem')({
                                    propList: ['*'],
                                    mediaQuery: true
                                })
                            ]
                        }
                    },
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            // SCSS (except modules)
            {
                test: /\.scss$/,
                exclude: /\.module\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 3,
                            modules: false,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: loader => [
                                require('autoprefixer'),
                                require('postcss-pxtorem')({
                                    propList: ['*'],
                                    mediaQuery: true
                                })
                            ]
                        }
                    },
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            outputStyle: 'expanded',
                            sourceMap: true
                        }
                    }
                ]
            },
            // SCSS + CSS Modules
            {
                test: /\.module.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 3,
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                            modules: true,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: loader => [
                                require('autoprefixer'),
                                require('postcss-pxtorem')({
                                    propList: ['*'],
                                    mediaQuery: true
                                })
                            ]
                        }
                    },
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            outputStyle: 'expanded',
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader'
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'dist/img/[name].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'dist/media/[name].[ext]'
                }
            }
        ]
    },
    plugins: utils.generatePages().concat([
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.

        // copy custom static assets
        new CopyWebpackPlugin([{
            from: config.dev.staticAssets,
            to: config.build.assetsSubDirectory,
            ignore: ['.*']
        }]),

        new BrowserSyncPlugin(
            // BrowserSync options
            {
                host: 'localhost',
                port: 3000,
                proxy: 'http://localhost:8080/',
                open: false,
            },
            // Plugin options
            {
                reload: false
            }
        )
    ])
};
