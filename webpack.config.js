const path = require('path');
const webpack = require('webpack');

const distFolder = 'build';
const cwd = process.cwd();

module.exports = {
  entry: {
    'entry.js?': `./${distFolder}/entry.js`
  },

  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'dist')
  },

  resolve: {
    alias: {
      '/@webformula/pax-core/index.js': path.resolve(cwd, `${distFolder}/@webformula/pax-core/index.js`)
    }
  }
};
