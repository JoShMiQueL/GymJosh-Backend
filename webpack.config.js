const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const common = {
  mode: process.env.NODE_ENV,
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

const backend = {
  entry: { index: "./src/index.ts" },
  target: "node",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(j|t)s$/,
        exclude: /(node_modules|bower_components)/,
        use: "ts-loader",
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/backend"),
    clean: true,
  },
  optimization: { runtimeChunk: "single" },
};

const frontend = {
  entry: "./public/script.js",
  target: "web",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "GymJoSh - API",
      template: "public/index.html",
      favicon: "public/favicon.ico",
    }),
  ],
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist/frontend"),
    clean: true,
  },
  optimization: { runtimeChunk: "single" },
};

module.exports = [
  { ...common, ...backend },
  { ...common, ...frontend },
];
