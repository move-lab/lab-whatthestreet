const resolve = require('path').resolve;

module.exports = {
  assetPrefix: process.env.URL_PREFIX || '',

  publicRuntimeConfig: {
    URL_PREFIX: process.env.URL_PREFIX || '',
    ROOT_URL: process.env.ROOT_URL || '',
    S3_GIF_BUCKET:
      process.env.S3_GIF_BUCKET || 'https://lab-whatthestreet-gifgallery.s3.amazonaws.com',
    env_mapbox_token: process.env.MAPBOX_ACCESS_TOKEN,
    env_ga_id: process.env.GA_ID
  },

  webpack: (config, { dev, defaultLoaders }) => {
    config.module['noParse'] = /(mapbox-gl)\.js$/;
    config.module.rules.push({
      test: /\.css$/,
      use: [
        defaultLoaders.babel,
        {
          loader: require('styled-jsx/webpack').loader,
          options: {
            type: 'scoped'
          }
        }
      ]
    });
    // Rules for mapbox gl
    config.resolve.alias = {
      ...config.resolve.alias,
      'mapbox-gl$': resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js')
    };

    return config;
  }
};
