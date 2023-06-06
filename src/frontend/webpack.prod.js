// Webpack production configuration
//
// Webpack Docs:
// https://webpack.js.org/guides/production/

const merge = require('webpack-merge');
const TerserPlugin = require("terser-webpack-plugin");
const common = require('./webpack.common.js');

module.exports = merge(common, {
  output: {
    filename: 'bundle.min.js',
  },
  optimization: {
    minimize: true,
    minimizer: [
        new TerserPlugin(),
    ],
  },
  mode: 'production',
});