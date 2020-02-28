const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const cwd = process.cwd();

module.exports = {
  entry: {
    'entry.js': './app/entry.js'
  },

  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    alias: {
      '/@webformula/pax-core': path.resolve(cwd, 'dist/@webformula/pax-core')
    }
  },

  plugins: [
    new CopyPlugin([
      // copy css files into root of dist folder
      { from: './app/index.html', to: './' },
      { from: './app/public', to: './' }
    ]),
  ],

  mode: 'development',
  devtool: 'inline-source-map',
  stats: 'errors-only'
};
