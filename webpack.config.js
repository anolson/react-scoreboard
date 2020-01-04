const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  output: {
    publicPath: "/assets/",
    path: __dirname + "/build",
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    publicPath: "/assets/",
    contentBase: "./public"
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx']
  }
};
