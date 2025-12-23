/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-28 15:36:54
 * @LastEditors: lcl
 * @LastEditTime: 2023-05-04 10:36:12
 * @Description: lcl
 */
/**
 * webpack: webpack@4 webpack-cli@3
 * 服务（利用的node）：webpack-dev-server@3
 * style-loader@2
 * css-loader@5
 *  html-webpack-plugin@4.5.0 -D:打包文件加入index.html,并且index.html中加入打包后文件的引用(header中)
 *
 * 工程化没必要全都用最新的，怕版本不兼容。
 * npm run  dev:执行打包 ->处理js、执行各种loader与plugins -> 打包文件在内存里面
 */
const { resolve } = require('path');
const htmlpWebpackPlugin = require('html-webpack-plugin');
console.log(resolve(__dirname, 'src/main.js'));
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: resolve(__dirname, 'src/main.js'),
  output: {
    filename: 'main.js',
    path: resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.vue'],
  },
  resolveLoader: {
    // loader:里面没有就找后面的路径
    modules: [resolve(__dirname, 'modules'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /.vue$/i,
        loader: 'vue-loader',
      },
      {
        test: /.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new htmlpWebpackPlugin({
      template: resolve(__dirname, 'public/index.html'),
    }),
  ],
};
