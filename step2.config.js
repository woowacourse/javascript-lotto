const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    port: 9000,
  },
  entry: './src/step2-index.js',
  output: {
    filename: 'step2-bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.mjs', '.css'],

    alias: {
      '@root': path.resolve(__dirname, '.'),
      '@App': path.resolve(__dirname, 'src/webView/MainApp'),
      '@webView': path.resolve(__dirname, 'src/webView'),
      '@src': path.resolve(__dirname, 'src'),
    },
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
      template: 'src/webView/index.html',
    }),
  ],
  devtool: 'inline-source-map',
};
