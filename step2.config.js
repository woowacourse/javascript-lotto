const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    port: 9000,
    devMiddleware: {
      writeToDisk: true, // 이 옵션을 통해 개발 서버도 파일을 disk에 저장하도록 설정합니다.
    },
  },
  entry: './src/step2-index.js',
  output: {
    filename: 'step2-bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.mjs', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'web-lotto game',
      inject: 'body',
      favicon: './favicon.ico',
    }),
  ],
  devtool: 'inline-source-map',
};
