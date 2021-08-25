// Set 'production' or 'development'
const MODE = "production";

// If it set to developement, Webpack also output source map
const enabledSourceMap = MODE === "development";

module.exports = {
  mode: MODE,

  // Entry point
  entry: "./presrc/index.js",

  // Output file
  output: {
    path: `${__dirname}/assets/js`,
    filename: 'main.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                // Transpile ES2020 to ES5
                "@babel/preset-env",
              ],
            },
          },
        ],
      },
    ],
  },
  // Setting to IE11 for Webpack 5 or more
  target: ["web", "es5"],
};
