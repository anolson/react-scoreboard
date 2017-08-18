const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  output: {
    publicPath: "/assets/",
    path: __dirname + "/build",
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader', 'babel-loader']
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
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
