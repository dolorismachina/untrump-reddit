const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'untrump.js',
    path: __dirname + '/dist/'
  },
  mode: 'development',
}
