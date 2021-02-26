const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const theme = `.`;

const isDev = process.argv[2] !== '--env=build';

// const HEAD_SCRIPTS = env => createConfig({ entry: '/js/dev/DOM/index.js', outputFile: 'head.min.js', cssFileName: 'head.min.css' });

const SCRIPTS = env => createConfig({ entry: '/test.js', outputFile: 'main.min.js', cssFileName: '../css/main.min.css' });



const createConfig = ({ entry, outputFile, cssFileName }) => {
  return {
    mode: !isDev ? 'production' : 'development',
    entry: ['@babel/polyfill', `${theme}${entry}`],
    output: {
      path: path.resolve(__dirname, 'test/js'),
      filename: outputFile
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: [
                '@babel/preset-env',
                '@babel/preset-react'
              ],
              plugins: [
                '@babel/plugin-transform-shorthand-properties',
                [
                  '@babel/plugin-transform-react-jsx',
                  {
                    "pragma": "domJSX"
                  }
                ]
              ]
            }
          }
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader',
              options: {
                url: false,
                sourceMap: isDev
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [autoprefixer({ grid: true })],
                sourceMap: isDev
              }
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: isDev
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader',
              options: {
                url: false,
                sourceMap: isDev
              }

            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: cssFileName
      }),
      !isDev ?
        new OptimizeCssAssetsPlugin({
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
          canPrint: true
        }) : { apply: () => { } }
    ],
    devtool: !isDev ? false : 'source-map',
    watch: isDev,
    watchOptions: {
      ignored: /node_modules/
      // poll: 500
    }
  }
}





// module.exports = [SCRIPTS];
module.exports = SCRIPTS;







