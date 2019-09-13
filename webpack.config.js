const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'watermark.js',
    library: 'watermark',
    libraryExport: 'default',
    globalObject: 'this',
    libraryTarget: 'umd',
  },
  mode: process.env.NODE_DEV,
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   include: [path.resolve(__dirname, 'src')],
      //   exclude: /(node_modules|bower_components)/,
      //   loader: 'babel-loader',
      // },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          'postcss-loader',
          'stylus-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new webpack.ProvidePlugin({
      _: ['lodash'],
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },

  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.styl'], //后缀名自动补全
  },
}
