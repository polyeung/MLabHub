// Webpack production configuration
//
// Webpack Docs:
// https://webpack.js.org/guides/production/

const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  output: {
    filename: 'bundle.min.js',
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
    }),
  ],
  mode: 'production',
});