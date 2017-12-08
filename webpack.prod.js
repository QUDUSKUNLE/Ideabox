const path = require('path');
const webpack = require('webpack');
require('dotenv').config();
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
  entry: [
    path.join(__dirname, 'client/src/app/index.jsx'),
    path.join(__dirname, 'client/src/app/css/index.scss')
  ],
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, './client/build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },

      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000',
          'img-loader'
        ]
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loaders: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin('bundle.css'),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({ debug: false }),
    new UglifyJsPlugin({ sourceMap: true })
  ],

  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
};

module.exports = config;
