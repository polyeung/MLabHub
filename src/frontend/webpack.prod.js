// Webpack production configuration
//
// Webpack Docs:
// https://webpack.js.org/guides/production/


const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  entry: './src/main.tsx',
  output: {
    path: path.join(__dirname, 'bundles'),
  },
  module: {
    rules: [
      {
        // Test for ts or tsx files
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new BundleTracker({
      path: path.resolve(__dirname),
      filename: "webpack-stats.json"
    }),
  ],
  output: {
    filename: 'bundle.min.js',
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
    }),
  ],
  mode: 'production',
};
