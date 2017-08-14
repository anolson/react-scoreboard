module.exports = {
  entry: './app.jsx',
  output: {
    publicPath: "/build",
    path: __dirname + "/build",
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
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
    publicPath: "/build"
  }
};
