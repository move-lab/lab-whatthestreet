const resolve = require('path').resolve;

module.exports = {
  webpack: (config, { dev }) => {

    config.module['noParse'] = /(mapbox-gl)\.js$/;

    // Rules for mapbox gl
    config.resolve = {
      alias: {
        'mapbox-gl$': resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js')
      }
    }

    return config
  }
}
