const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge');

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev


const partial = () => {
  console.log("partial")

  return {
    // mode: process.env.NODE_ENV,
    // context: path.resolve(__dirname, 'frontend', 'src'),
    // stats: 'errors-warnings',
    // entry: {
    //   index: ['@babel/polyfill', './main/index.js']
    // },
    // output: {
    //   filename: 'main.js',
    //   path: path.resolve(__dirname, 'frontend', 'dist'),
    //   publicPath: '/'
    // },
    // devServer: {
    //   contentBase: path.resolve(__dirname, 'frontend', 'dist'),
    //   useLocalIp: false,
    //   host: '127.0.0.1',
    //   port: 8000,
    //   hot: isDev
    // },
  }
}




const common = (env, opts) => {

  console.log("COMMON")
  const useLocalNetwork = opts.localNetwork === 'true'
  console.log('useLocalNetwork', useLocalNetwork)

  return {
    // devtool: isDev ? 'inline-source-map' : '',
    // resolve: {
    //   extensions: ['.js', '.vue'],
    //   alias: {
    //     '@': path.resolve(__dirname, 'frontend', 'src')
    //   }
    // },
    // plugins: [
    //   new VueLoaderPlugin(),
    //   new HtmlWebpackPlugin({
    //     filename: 'index.html',
    //     template: './main/index.html'
    //   })
    // ],
    // module: {
    //   rules: [
    //     {
    //       test: /\.js$/,
    //       exclude: /node_modules/,
    //       use: {
    //         loader: 'babel-loader',
    //         options: {
    //           presets: ['@babel/preset-env']
    //         }
    //       }
    //     },
    //     {
    //       test: /\.vue$/,
    //       loader: 'vue-loader'
    //     },
    //     {
    //       test: /\.css$/,
    //       use: [
    //         'vue-style-loader',
    //         'css-loader'
    //       ]
    //     },
    //     {
    //       test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
    //       loader: 'file-loader'
    //     },

    //   ]
    // }
  }
}


module.exports = (env, opts) => merge(common(env, opts), partial(env, opts))
