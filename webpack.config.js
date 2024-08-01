// webpack.config.js
module.exports = {
    module: {
      rules: [
        {
          test: /\.m?js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
          exclude: /node_modules\/@mediapipe\/tasks-vision/ // Correct path exclusion
        },
      ],
    },
    ignoreWarnings: [/Failed to parse source map/], // Ignoring specific warnings by regex
  };