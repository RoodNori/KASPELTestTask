const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/components/App/index.tsx',
  output: {
    publicPath: '',
  },
  resolve: {
    extensions: ['.svg', '.jpg', '.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
  ],
};
