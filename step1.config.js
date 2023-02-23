import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const __dirname = path.resolve();

export default {
  mode: 'development',
  entry: './src/step1-index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'step1-bundle.js',
    libraryTarget: 'module',
    chunkFormat: 'array-push',
  },
  resolve: {
    extensions: ['.js', '.mjs'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
  devtool: 'inline-source-map',
  target: 'node',
  experiments: {
    outputModule: true,
  },
};
