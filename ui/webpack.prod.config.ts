import path from "path";
import { Configuration } from "webpack";
import baseConfig from './webpack.config';

const config: Configuration = {
  ...baseConfig,
  mode: "production",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[contenthash].js",
    chunkFilename: '[name].chunk.js',
    publicPath: "/",
  },
};

export default config;
