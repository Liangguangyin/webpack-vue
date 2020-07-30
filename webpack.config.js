var path = require('path');
var webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  //项目入口文件
  entry: ["@babel/polyfill", './src/main.js'],
  output: {
    //打包出口路径
    path: path.resolve(__dirname, './dist'),
    //通过devServer访问路径
    publicPath: '/dist/',
    //打包后的文件名
    filename: 'main.js'
  },
  
  mode: 'development',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.0.24:8081',
        pathRewrite: { '^/api': '/' },
        changeOrigin: true,     // target是域名的话，需要这个参数，
        // secure: false,          // 设置支持https协议的代理
      },
    }
  },
  resolve: {
    //路径别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, './src'),
    },
    //路径别名自动解析确定的扩展
    extensions: ['.js', '.vue', '.json']
  },
  // 样式文件名解析
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'vue-style-loader',
        'css-loader'
      ]
    }, {
      test: /\.scss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        'sass-loader'
      ]
    },
    {
      test: /\.sass$/,
      use: [
        'vue-style-loader',
        'css-loader',
        'sass-loader?indentedSyntax'
      ]
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]?[hash]'
      }
    },
    {
      test: /\.(js|jsx)$/, exclude: /node_modules/,
      loader: "babel-loader"
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
      loader: 'file-loader'
    }],
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ],
};
