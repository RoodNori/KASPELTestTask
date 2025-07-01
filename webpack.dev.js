const { merge } = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {
  devServer: {
    historyApiFallback: true,
    open: true,
  },
  mode: 'development',
  devtool: 'inline-source-map',
});
