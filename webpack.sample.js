// 最初使用的带各种尝试的webpack配置文件
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const loader = require('css-loader')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'development',
  target: 'web',
  entry: {
    main: './src/main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          // MiniCssExtractPlugin.loader,
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            },
          },
          // 'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        type: 'asset/resource',
        parser: {
          // 转base64的条件
          dataUrlCondition: {
             maxSize: 5 * 1024, // 25kb
          }
        },
        generator: {
          // 打包到 dist/image 文件下
          filename: 'images/[contenthash][ext][query]',
        },
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // assets: '~/assets',
    }
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/chunk-[contenthash].js',
    // publicPath: '/dist/',
    // publicPath: 'https://cdn.example.com/assets/',
    clean: true
  },
  devServer: {
    // static: path.join(__dirname, 'public'),
    // port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    // new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // 将css代码输出到dist/styles文件夹下
      filename: '/styles/chunk-[contenthash].css',
      ignoreOrder: true,
    }),
    new VueLoaderPlugin()
  ]
}