const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/app.jsx',
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {test: /\.html$/, use: 'html-loader'},
      {test: [/\.js$/, /\.jsx$/], exclude: /node_modules/, use: ['babel-loader']},
      {test: /\.css$/, use:["style-loader", "css-loader"]}
    ]
  }
};