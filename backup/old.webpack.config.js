/* eslint-env node */
/* global __dirname, process, console */

var path = require("path");
// var HtmlwebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");
var merge = require("webpack-merge");
var validate = require("webpack-validator");

var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);
var BUILDJSPATH = "js/vendor.js";
const srcDir = path.join(__dirname, "src");

var common = {
  output: {
    path: path.resolve(ROOT_PATH, "build"),
    filename: "js/bundle.js"
  }
};

var exportModule;

if (TARGET === "build") {
  exportModule = merge(common, {
    entry: {
      app: path.resolve(ROOT_PATH, "app/app.jsx")
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js", function(module) {
        return module.resource && module.resource.indexOf(srcDir) === -1;
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        "root.jQuery": "jquery"
      })

    ],
    devtool: "source-map",
    module: {
      // Note: don"t include the same loader in multiple places, e.g putting babel under "common" and here.
      // Webpack will error out if you try this.
      loaders: [{
        loader: "babel-loader",
        query: {
          presets: ["react"]
        },
        // Skip any files outside of your project"s `src` directory
        include: [
          path.resolve(__dirname, "src/js")
        ],
        // Only run `.js` files through Babel
        test: /\.jsx?$/
      }]
    }

  });
}

if (TARGET === "buildmin") {
  exportModule = merge(common, {
    entry: {
      app: path.resolve(ROOT_PATH, "app/app.jsx")
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js", function(module) {
        return module.resource && module.resource.indexOf(srcDir) === -1;
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        "root.jQuery": "jquery"
      })
    ],
    devtool: "source-map",
    module: {
      // Note: don"t include the same loader in multiple places, e.g putting babel under "common" and here.
      // Webpack will error out if you try this.
        loaders: [{
            loader: "babel-loader",
            query: {
                presets: ["react"]
            },
            // Skip any files outside of your project"s `src` directory
            include: [
                path.resolve(__dirname, "src/js")
            ],
            // Only run `.js` files through Babel
            test: /\.jsx?$/
        }]
    }

  });
}

var devServerCommon = {
  entry: {
    app: [path.resolve(ROOT_PATH, "app/app.jsx")]
  },
  devServer: {
    noInfo: false,
    historyApiFallback: true,
    hot: true,
    inline: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

var startCommon = merge(common, devServerCommon);

if (TARGET === "start" || !TARGET) {
  // react-hot loader used, with full(ish) eval source maps generated.
  console.log("start called");
  exportModule = merge(startCommon, {
    devtool: "eval-source-map",
    module: {
      // Note: don"t include the same loader in multiple places, e.g putting babel under "common" and here.
      // Webpack will error out if you try this.
        loaders: [{
            loader: "babel-loader",
            query: {
                presets: ["react"]
            },
            // Skip any files outside of your project"s `src` directory
            include: [
                path.resolve(__dirname, "src/js")
            ],
            // Only run `.js` files through Babel
            test: /\.jsx?$/
        }]
    }

  });
}

console.log("exportModule=" + JSON.stringify(exportModule, null, 4));

module.exports = validate(exportModule);
