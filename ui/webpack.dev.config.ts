import path from "path";
import { Configuration as WebpackConfiguration, HotModuleReplacementPlugin } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import baseConfig from './webpack.config';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  ...baseConfig,
  mode: "development",
  plugins: [
    ...Array.isArray(baseConfig.plugins) ? baseConfig.plugins : [],
    new HotModuleReplacementPlugin(),
  ],
  devtool: "inline-source-map",
  devServer: {
    static: path.join(__dirname, "build"),
    historyApiFallback: true,
    port: 4500,
    open: true,
    hot: true
  },
};

export default config;
