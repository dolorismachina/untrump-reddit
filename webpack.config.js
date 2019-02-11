const path = require('path')

module.exports = {
  entry: './untrump.js',
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  mode: 'development',
  devtool: 'none'
}
