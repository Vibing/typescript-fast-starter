import webpack from 'webpack';
import path from 'path';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';

export default {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, '../src/index.tsx')
  },
  devtool: 'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle-[name]-[hash].js',
    chunkFilename: 'chunk-[name]-[hash].js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.less', '.json'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: [/github-markdown-css/, /highlight.js/]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader?sourceMap=true',
            options: {
              javascriptEnabled: true
            }
          }
        ],
        include: [path.resolve(__dirname, '../node_modules/antd')]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ],
        exclude: /node_modules/
      },
      // 解析图片资源
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      // 解析 字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true
            }
          }
        ]
      },
      canPrint: true
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    new webpack.DefinePlugin({
      __DEV__: true,
      __BASE_URL__: JSON.stringify('http://admin.chenlong666.cn/')
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dll/vendor-manifest.json')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.ejs'),
      templateParameters: {
        title: 'test'
      }
    }),
    new AddAssetHtmlPlugin([
      {
        // 要添加到编译中的文件的绝对路径，以及生成的HTML文件。支持 globby 字符串
        filepath: require.resolve('../dll/vendor.dll.js'),
        attributes: {
          defer: true
        }
      }
    ]),
    new ScriptExtHtmlWebpackPlugin({
      defer: ['app']
    })
  ],
  devServer: {
    port: 5000,
    host: '0.0.0.0',
    disableHostCheck: true
  }
};
