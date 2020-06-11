"use strict";
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetWebpackPlugin = require("optimize-css-assets-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const filename = (extension) =>
  isProd ? `[name].[hash].${extension}` : `[name].${extension}`;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
    },
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCSSAssetWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

const styleLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true,
      },
    },
    "css-loader",
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const scriptLoaders = (extraPresets) => {
  const loaders = [
    {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env", "@babel/preset-react"],
      },
    },
  ];

  if (extraPresets) {
    loaders[0].options.presets.concat(extraPresets);
  }

  if (isDev) {
    loaders.push("eslint-loader");
  }

  return loaders;
};

const plugins = () => {
  return [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/public/favicon.ico"),
          to: path.resolve(__dirname, "build"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename("css"),
    }),
  ];
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: ["@babel/polyfill", "./index.tsx"],
  output: {
    filename: filename("js"),
    path: path.resolve(__dirname, "build"),
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"],
    alias: {
      "@root": path.resolve(__dirname, "src"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@components": path.resolve(__dirname, "src/components"),
      "@actions": path.resolve(__dirname, "src/redux/actions"),
      "@reducers": path.resolve(__dirname, "src/redux/reducers"),
      "@sagas": path.resolve(__dirname, "src/redux/sagas"),
      "@store": path.resolve(__dirname, "src/redux/store"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@declarations": path.resolve(__dirname, "src/declarations"),
    },
  },
  optimization: optimization(),
  devServer: {
    port: 3000,
    hot: isDev,
  },
  devtool: isDev ? "source-map" : undefined,
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: styleLoaders(),
      },
      {
        test: /\.(sass|scss)$/,
        use: styleLoaders("sass-loader"),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: scriptLoaders(),
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: scriptLoaders(["@babel/preset-react"]),
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: scriptLoaders(["@babel/preset-typescript"]),
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: scriptLoaders(["@babel/preset-react", "@babel/preset-typescript"]),
      },
    ],
  },
};
