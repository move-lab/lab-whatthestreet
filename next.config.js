const resolve = require("path").resolve;
const webpack = require("webpack");

module.exports = {
  webpack: (config, { dev }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        env_mapbox_token: JSON.stringify(process.env.env_mapbox_token),
        env_ga_id: JSON.stringify(process.env.env_ga_id)
      })
    );
    config.module["noParse"] = /(mapbox-gl)\.js$/;

    // Rules for mapbox gl
    config.resolve = {
      alias: {
        "mapbox-gl$": resolve("./node_modules/mapbox-gl/dist/mapbox-gl.js")
      }
    };

    return config;
  }
};
