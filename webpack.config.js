/* eslint-disable no-unused-vars */
// webpack.config.js
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// We'll refer to our source and dist paths frequently, so let's store them here
const PATH_SOURCE = path.join(__dirname, "./src");
const PATH_DIST = path.join(__dirname, "./dist");
const isProduction = process.argv.indexOf("-p") >= 0 || process.env.NODE_ENV === "production";

// If we export a function, it will be passed two parameters, the first
// of which is the webpack command line environment option `--env`.
// `webpack --env.production` sets env.production = true
// `webpack --env.a = b` sets env.a = 'b'
// https://webpack.js.org/configuration/configuration-types#exporting-a-function
module.exports = {

  // Tell Webpack to do some optimizations for our environment (development
  // or production). Webpack will enable certain plugins and set
  // `process.env.NODE_ENV` according to the environment we specify.
  // https://webpack.js.org/configuration/mode
  // mode: "development",

  // Configuration options for Webpack DevServer, an Express web server that
  // aids with development. It provides live reloading out of the box and can
  // be configured to do a lot more.
  devServer: {
    // The dev server will serve content from this directory.
    contentBase: PATH_DIST,

    // Specify a host. (Defaults to "localhost".)
    host: "localhost",

    // Specify a port number on which to listen for requests.
    port: 8080,

    // When using the HTML5 History API (you'll probably do this with React
    // later), index.html should be served in place of 404 responses.
    historyApiFallback: true,

    // Show a full-screen overlay in the browser when there are compiler
    // errors or warnings.
    overlay: {
      errors: true,
      warnings: true,
    },
  },

  // The point or points to enter the application. This is where Webpack will
  // start. We generally have one entry point per HTML page. For single-page
  // applications, this means one entry point. For traditional multi-page apps,
  // we may have multiple entry points.
  // https://webpack.js.org/concepts#entry
  entry: [
    path.join(PATH_SOURCE, "./index.tsx"),
  ],

  // Tell Webpack where to emit the bundles it creates and how to name them.
  // https://webpack.js.org/concepts#output
  // https://webpack.js.org/configuration/output#outputFilename
  output: {
    path: PATH_DIST,
    filename: "js/[name].[hash].js",
  },

  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    mainFields: ["browser", "module", "main"],
  },

  // Determine how the different types of modules will be treated.
  // https://webpack.js.org/configuration/module
  // https://webpack.js.org/concepts#loaders
  module: {
    rules: [
      // {
      //   // .js, .jsx
      //   test: /\.(jsx?)$/, // Apply this rule to files ending in .js
      //   exclude: /node_modules/, // Don't apply to files residing in node_modules
      //   use: { // Use the following loader and options
      //     loader: "babel-loader",
      //     // We can pass options to both babel-loader and Babel. This option object
      //     // will replace babel.config.js
      //     options: {
      //       plugins: ["@babel/plugin-proposal-class-properties"],
      //       presets: [
      //         ["@babel/preset-env", {
      //           debug: false,
      //           useBuiltIns: "usage",
      //           corejs: 3,
      //         }],
      //         "@babel/preset-react",
      //       ],
      //     },
      //   },
      // },
      {

        test: /\.tsx?$/,
        use: [
          !isProduction && {
            loader: "babel-loader",
            options: {
              plugins: ["@babel/plugin-proposal-class-properties",
                ["@babel/plugin-transform-modules-commonjs", {
                  allowTopLevelThis: true,
                }]],
              // presets: [
              //   ["@babel/preset-env",
              //     {
              //       targets:
              //       {
              //         node: "current",
              //       },
              //     }],
              //   "@babel/preset-typescript",
              // ],
            },
          },
          "ts-loader",
        ].filter(Boolean),
      },
      // css
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          "file-loader",
        ],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development", // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false,
    }),

    // This plugin will delete all files inside `output.path` (the dist directory),
    // but the directory itself will be kept.
    // https://github.com/johnagan/clean-webpack-plugin
    new CleanWebpackPlugin(),

    // This plugin will generate an HTML5 file that imports all our Webpack
    // bundles using <script> tags. The file will be placed in `output.path`.
    // https://github.com/jantimon/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: path.join(PATH_SOURCE, "./index.html"),
    }),
  ],
};
