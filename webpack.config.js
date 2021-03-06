const path = require('path');
const autoprefixer = require('autoprefixer');
const Imagemin = require('imagemin-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const webpack = require('webpack');

const ENVIRONMENT = process.env.NODE_ENV;

const postCSSLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    plugins() {
      return [
        autoprefixer({
          overrideBrowserslist: ['last 3 versions']
        })
      ];
    }
  }
};

const config = {
  entry: {
    bundle: [`${__dirname}/client/src/index.js`],
    unsupportedBrowser: [`${__dirname}/client/src/components/unsupportedBrowser/unsupportedBrowser.js`]
  },
  output: {
    libraryTarget: 'var',
    path: `${__dirname}/client/dist/`,
    filename: 'js/[name].js',
    chunkFilename: '[id].js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: ENVIRONMENT === 'development' || ENVIRONMENT === 'development:client'
            },
          },
          'css-loader',
          'clean-css-loader',
          postCSSLoader,
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, './node_modules/compass-mixins/lib')],
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: ['file-loader?name=[name].html',
          'extract-loader',
          {
            loader: 'html-loader',
            options: {
              minimize: true,
              removeAttributeQuotes: false,
              collapseWhitespace: true,
              conservativeCollapse: false
            }
          }
        ]
      },
      {
        test: /\.(png|svg|ico)$/,
        loader: 'file-loader?name=images/[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(ENVIRONMENT)
      }
    }),
    new webpack.DefinePlugin({ 'global.GENTLY': false }),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css'
    }),
    new WriteFilePlugin(),
  ],
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    inline: true,
    open: true
  },
  devtool: 'source-map',
  stats: {
    colors: true,
    reasons: true
  },
  target: 'web'
};

if (ENVIRONMENT === 'development' || ENVIRONMENT === 'development:client') {
  // add modules for hot reloading
  config.entry.bundle.unshift('webpack-hot-middleware/client');
  config.entry.bundle.unshift('webpack/hot/dev-server');
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.mode = 'development';
} else {
  config.mode = 'production';

  const uglifyJsOptions = {
    sourceMap: true,
    extractComments: true,
    uglifyOptions: {
      compress: {
        drop_console: true
      }
    }
  };

  const imageminOptions = {
    plugins: [
      ['pngquant'],
      ['svgo']
    ]
  };

  // minify JS, compress Images
  config.plugins.push(
    new UglifyJsPlugin(uglifyJsOptions),
    new Imagemin({ imageminOptions })
  );
}


module.exports = config;
