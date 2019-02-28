const resolve = require("path").resolve;

module.exports = {

  assetPrefix: process.env.URL_PREFIX || "",

  publicRuntimeConfig: {
    URL_PREFIX: process.env.URL_PREFIX || "",
    ROOT_URL: process.env.ROOT_URL || "",
    S3_GIF_BUCKET: process.env.S3_GIF_BUCKET || `https://s3-eu-west-1.amazonaws.com/gif.whatthestreet.moovellab.com`,
    env_mapbox_token: process.env.env_mapbox_token,
    env_ga_id: process.env.env_ga_id
  },

  webpack: (config, { dev }) => {

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
