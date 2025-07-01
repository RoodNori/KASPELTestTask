const { merge } = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {
  output: {
    filename: 'bundle.js',
    path: './dist',
  },
  mode: 'production',
  devtool: false,
});
