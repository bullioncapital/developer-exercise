const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env) => {
  // console.log(env.NODE_ENV);
  return {
    mode: env.production ? 'production' : 'development',
    context: path.join(__dirname, 'src'),
    entry: './index.ts',
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: '[name].[hash].js',
      chunkFilename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /(node_modules|bower_components)/,
          use: 'ts-loader'
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
    target: 'node'
  };
};
