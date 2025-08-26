const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const IGNORED_ASSET_EXTENSIONS = [
  '.aseprite',
  '.tiled-session',
  '.tiled-project'
]

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts(x?)$/,
        use: 'ts-loader'
      },
      // GLSL Shaders
      {
        test: /\.(vert|frag)$/i,
        use: 'raw-loader'
      }
    ]
  },
  output: {
    filename: 'bin/bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  performance: {
    maxEntrypointSize: 2560000,
    maxAssetSize: 256000,
    assetFilter: function (file) {
      return file !== 'bundle.js'
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "assets",
          to: "assets",
          filter: filePath => {
            return !IGNORED_ASSET_EXTENSIONS.includes(path.extname(filePath));
          }
        },
        {
          from: "index.html",
          to: ".",
        },
      ],
    })
  ],
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ]
  }
};
