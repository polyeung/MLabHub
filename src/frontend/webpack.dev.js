// Webpack development configuration
//
// Webpack Docs:
// https://webpack.js.org/guides/production/

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  output: {
    filename: 'main.js',
  },
  devtool: 'inline-source-map',
    mode: 'development',
    cache: false
});