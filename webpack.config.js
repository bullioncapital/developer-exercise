const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var fs = require('fs');


var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = (env) => {
  // console.log(env.NODE_ENV);
  return {
    mode: env.production ? 'production' : 'development',
    context: path.join(__dirname, 'src'),
    entry: './index.ts',
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: 'index.js'
      // filename: '[name].[hash].js'
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /(node_modules|bower_components)/,
          use: 'ts-loader'
        },
        {
          test: /\.csv$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      ]
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {}
    },
    devtool: env.production ? 'none':'source-map',
    plugins: [
      new CleanWebpackPlugin(['dist']),
    ],
    target: 'node',
    externals: nodeModules,
    node: {
      __dirname: false
    }
  };
};
