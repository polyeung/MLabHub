// Webpack development configuration
//
// Webpack Docs:
// https://webpack.js.org/guides/production/

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  output: {
    filename: 'main.js',
    filename: "[name]-[contenthash].js",
    clean: true,
  },
  devtool: 'inline-source-map',
<<<<<<< HEAD
  mode: 'development',
  cache: false,
  watchOptions: {
    poll: true,
    ignored: /node_modules/
  }
}
);
=======
    mode: 'development',
  cache: false,
  watchOptions: {
	  poll: true,
	  ignored: /node_modules/
	}
});
>>>>>>> master
