const path = require('path');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

function prodConfig() {
  return {

    entry: {
      index: ['@babel/polyfill', './frontend/src/main/index.js']
    },

    output: {
      filename: '[name]_[chunkhash].js',
      path: path.resolve(__dirname, 'src', 'main', 'resources', 'static', 'js'),
      chunkFilename: '[name]_[chunkhash].js',
      publicPath: '/js/'
    },

    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `vendor.${packageName.replace('@', '')}.min`;
            },
          },
        },
      },
      minimizer: [
        new OptimizeCssAssetWebpackPlugin(),
        new TerserWebpackPlugin()
      ]
    },

    plugins: [
      new CleanWebpackPlugin(),
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        filename: `${__dirname}/src/main/resources/templates/bodySectionWithFrontendScripts.html`,
        template: './frontend/src/main/index.html'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
      })
    ],




  }
}


module.exports = (env, opt) => ({
  ...common(env, opt),
  ...prodConfig(env, opt)
})