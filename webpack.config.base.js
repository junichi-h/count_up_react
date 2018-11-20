import path from 'path';
import chalk from 'chalk';
import stylelint from 'stylelint';

import { config } from './gulp/constants/config';

const isProd = !!(process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'dev-prod');
const MODE = isProd ? 'production' : 'development';

console.log(
  chalk.cyan(
    `Attempting to bind to HOST environment variable: ${chalk.yellow(
        chalk.bold.bgCyan(process.env.NODE_ENV)
    )}`
  )
);
console.log(`isProd : ${isProd}`);

// localIdentName: '[name]-[local]-[hash:base64:5]'
const localIdentName = isProd ? '[hash:base64:5]' : '[name]-[local]-[hash:base64:5]';

export default {
  mode: MODE,
  cache: true,
  target: 'web',
  output: {
    path: path.join(__dirname, config.tmp, config.assets, config.js),
    publicPath: `/${config.assets}/${config.js}/`,
    filename: '[name].bundle.js',
    chunkFilename: '[chunkhash].js',
    sourceMapFilename: '[name].map'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        include: __dirname,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true

            }
          }
        ]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProd,
              minimize: true
            }
          }
        ]
      },
      // SASS support - compile all other .scss files and pipe it to style.css
      {
        test: /\.(scss|sass)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: true,
              modules: true,
              sourceMap: !isProd,
              importLoaders: 2,
              localIdentName
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProd
            }
          }
        ]
      }
    ]
  },
  resolve: {
    descriptionFiles: ['package.json'],
    enforceExtension: false,
    modules: ['src', 'src/js', 'web_modules', 'node_modules']
  }
}