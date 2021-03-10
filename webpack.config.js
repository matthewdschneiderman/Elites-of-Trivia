const path = require('path');

// module.exports = {
//   entry: path.resolve(__dirname, './client/app.jsx'),
//   output: {
//     path: path.resolve(__dirname, './dist'),
//     filename: 'bundle.js',
//   },
//   module: {
//     rules: [
//       {
//         test: /.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env', '@babel/preset-react'],
//           },
//         },
//       },
//       {
//         test: /.css$/i,
//         use: ['style-loader', 'css-loader', 'ts-loader'],
//       },
//       {
//         test: /.(png|svg|jpg|gif)$/i,
//         use: [
//           {
//             loader: 'url-loader',
//           },
//         ],
//       },
//       {
//         test: /.scss$/,
//         use: ['style-loader', 'css-loader', 'sass-loader'],
//       },
//       {
//         test: /.(woff|woff2|eot|ttf|otf)$/,
//         use: ['file-loader'],
//       },
//     ],
//   },
// };

module.exports = {
  entry: path.resolve(__dirname, './client/app.jsx'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /.css$/i,
        use: ['style-loader', 'css-loader', 'ts-loader'],
      },
      {
        test: /.(png|svg|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
      {
        test: /.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
};
