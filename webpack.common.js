const helpers = require('./webpack.helpers');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

module.exports = {
  //cache: false,
  entry: {
    'polyfills': './client/polyfills.ts',
    'vendor':    './client/vendor.ts',
    'main':      './client/main.ts'
  },
  resolve: {
    extensions: ['', '.ts', '.js', '.json'],
    root: helpers.root('client'),
    modulesDirectories: ['node_modules'],
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          helpers.root('/node_modules/rxjs'),
          helpers.root('/node_modules/@angular'),
          helpers.root('/node_modules/@ngrx'),
          helpers.root('/node_modules/@angular2-material'),
        ]
      }

    ],
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loaders: ['to-string-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: ['client/index.html']
      }
    ]
  },
  plugins: [
    new ForkCheckerPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),
    // new CopyWebpackPlugin([{
    //   from: 'server/public/assets/js/index.html',
    //   to: 'server/public/views/index.html'
    // }]),
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      chunksSortMode: 'dependency'
    })
  ],
  node: {
    global: 'window',
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};
