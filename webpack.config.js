const path = require("path");

// const HtmlwebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const merge = require("webpack-merge");

const TARGET = process.env.npm_lifecycle_event;
const ROOT_PATH = path.resolve(__dirname);
const BUILDJSPATH = "js/vendor.js";

const common = {
  output: {
    path: path.resolve(ROOT_PATH, "build"),
    filename: "js/bundle.js"
  }
};


if (TARGET === "build") {
  module.exports = merge(common, {
    entry: {
      app: path.resolve(ROOT_PATH, "app/app.jsx"),
      vendor: ["react", "jquery", "jquery-ui"]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        filename: BUILDJSPATH,
        minChunks: module => {
          const userRequest = module.userRequest;

          // module.userRequest returns name of file, including path
          return userRequest && userRequest.match(/\.js$/) && userRequest.indexOf("node_modules") >= 0;
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
        test: /\.jsx?$/,
        loaders: ["babel-loader"],
        include: path.resolve(ROOT_PATH, "app")
      }]
    }

  });
}

if (TARGET === "buildmin") {
  module.exports = merge(common, {
    entry: {
      app: path.resolve(ROOT_PATH, "app/app.jsx")
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        filename: BUILDJSPATH,
        minChunks: module => {
          const userRequest = module.userRequest;

          // module.userRequest returns name of file, including path
          return userRequest && userRequest.match(/\.js$/) && userRequest.indexOf("node_modules") >= 0;
        }
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
        test: /\.jsx?$/,
        loaders: ["babel-loader"],
        include: path.resolve(ROOT_PATH, "app")
      }]
    }

  });
}

const devServerCommon = {
  entry: {
    app: [path.resolve(ROOT_PATH, "app/app.jsx")]
  },
  devServer: {
    noInfo: false,
    historyApiFallback: true,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      "root.jQuery": "jquery"
    })
  ]
};

const startCommon = merge(common, devServerCommon);

if (TARGET === "start" || !TARGET) {

  // react-hot loader used, with full(ish) eval source maps generated.
  module.exports = merge(startCommon, {
    devtool: "eval-source-map",
    module: {
      // Note: don"t include the same loader in multiple places, e.g putting babel under "common" and here.
      // Webpack will error out if you try this.
      loaders: [{
        test: /\.jsx?$/,
        loaders: ["babel-loader"],
        include: path.resolve(ROOT_PATH, "app")
      }]
    }
  });
}
