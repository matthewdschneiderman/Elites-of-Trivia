const path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  mode: 'development',
  entry: path.resolve(__dirname, './client/app.jsx'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
      crypto: require.resolve('crypto-browserify'),
      buffer: require.resolve('buffer/'),
      https: require.resolve('https-browserify'),
      http: require.resolve('stream-http'),
      vm: require.resolve('vm-browserify'),
      os: require.resolve('os-browserify/browser'),
      stream: require.resolve('stream-browserify'),
      assert: require.resolve('assert/'),
      constants: require.resolve('constants-browserify'),
    },
  },
  target: 'web',
  externals: [
    {
      webpack: {
        commonjs: 'webpack',
        module: 'webpack',
      },
    },
  ],
};
