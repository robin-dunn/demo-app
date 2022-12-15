import path from "path";
import webpack, { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from "eslint-webpack-plugin";
import Dotenv from 'dotenv-webpack';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const env = process.env.NODE_ENV;
const appVersion = process.env.REACT_APP_VERSION;

const config: Configuration = {
  output: {
    chunkFilename: '[name].chunk.js',
    filename: "[name].js",
    path: path.resolve(__dirname, 'build'),
    publicPath: "/",
  },
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.css$|\.less$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName:'[local]--[hash:base64:5]'
              }
            },
          },
          "less-loader"
        ],
        include: /\.module\.less$/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
        exclude: /\.module\.less$/,
      },
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src")
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new Dotenv({
      path: `./.env.${env}`,
    }),
    new webpack.DefinePlugin({
      "process.env.REACT_APP_VERSION": JSON.stringify(`${appVersion}`)
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
  ],
};

export default config;
