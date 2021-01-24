const path = require('path')
const common = require('./webpack.common.js')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

function devConfig(env, opt) {
  const useLocalNetwork = opt.localNetwork === 'true'

  return {

    context: path.resolve(__dirname, 'frontend', 'src'),
    
    entry: {
      index: ['@babel/polyfill', './main/index.js']
    },

    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'frontend', 'dist'),
      publicPath: '/'
    },

    plugins: [
      new VueLoaderPlugin(),
    ],
    
    devtool: 'source-map',
    devServer: {
      contentBase: path.resolve(__dirname, 'frontend', 'dist'),
      useLocalIp: useLocalNetwork,
      host: '127.0.0.1',
      port: 8000,
      hot: true
    },
  }
}

module.exports = (env, opt) => ({
  ...common(env, opt),
  ...devConfig(env, opt)
})
