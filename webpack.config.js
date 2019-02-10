const path = require('path')

module.exports = {
  entry: {
    untrump: './src/index.js',
    background: './src/background.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist/'
  },
  mode: 'development',
}
