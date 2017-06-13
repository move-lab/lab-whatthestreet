const console = require('console');
const path = require('path');
const data = require('../cityMeta.json');
const redis = require('redis');
const sha1 = require('sha1');
const geoip = require('geoip-lite');
const maxBy = require('lodash.maxby');
const minBy = require('lodash.minby');
const turf = require('@turf/turf');

/**
 * Gets all Cities
 */
exports.getAllCities = (request, response) => {
  response.json(Object.keys(data).map((item) => ({ slug: item, name: data[item].name })));
};

exports.closestCityToGuess = (request, response) => {
  const guess = request.body.guess;

  if(!guess) {
    response.status(404).send(`No closest guest found`);
    return;
  }

  const allCitiesSpaces = Object.keys(data).map((item) => {
    const hundredPercent = data[item].space.rail + data[item].space.car + data[item].space.bike;
    const car = ((100 / hundredPercent) * data[item].space.car) / 100;
    const bike = ((100 / hundredPercent) * data[item].space.bike) / 100;
    const rail = ((100 / hundredPercent) * data[item].space.rail) / 100;
    const result = { car, bike, rail };
    return ({
      bike: result.bike,
      car: result.car,
      rail: result.rail,
      name: data[item].name,
      slug: item
    })
  });

  const getPercentOfRightness = (valueA, valueB) => (100 - Math.round(Math.abs(((valueA * 100) - (valueB * 100)))));

  let guessRightnessAgainstAllCities = allCitiesSpaces.map((item) => 
    ({
      score: (getPercentOfRightness(guess.bike, item.bike) + getPercentOfRightness(guess.car, item.car) + getPercentOfRightness(guess.rail, item.rail)) / 3,
      name: item.name,
      slug: item.slug
    })
  );

  const best = maxBy(guessRightnessAgainstAllCities, 'score');

  response.json(best);
};

/**
 * Gets nearest City by calculating IP-Location
 */
exports.getNerestCity = (request, response) => {
  // const ip = '185.158.103.43';
  const ip = request.params.ip;
  console.log('Client ip is: ' + ip);

  const geo = geoip.lookup(ip);

  if (geo === null) {
    response.status(404).send(`Not Found City near ${ip}`);
  } else {
    const cities = Object.keys(data);
    let city = '';

    if (cities.indexOf(geo.city) === -1) {
      city = getCityByPoint(geo.ll);
    } else {
      city = geo.city;
    }

    response.status(200).json(city);
  }
};

/**
 * Gets City Info
 */
exports.getInfo = (request, response) => {
  response.json(data[request.params.city]);
};

/**
 * Gets Streets
 */
exports.getStreets = (request, response) => {
  request.db.open((err, database) => {
    const collection = database.collection('streets');

    collection.find({}, { limit: request.limit }).toArray((error, docs) => {
      if (error) console.log(error);
      response.json(docs);
      request.db.close();
    });
  });
};

/**
 * Gets Street by ID
 */
exports.getStreetByID = (request, response) => {
  request.db.open((err, database) => {
    const collections = {
      bike: 'biketracks',
      rail: 'railtracks',
      railparking: 'railtracksparking',
      car: 'streets',
    };

    const collection = database.collection(collections[request.params.vehicle]);

    collection.findOne({ _id: parseInt(request.params.id, 10) }, {}, (error, docs) => {
      if (error) console.log(error);
      response.json(docs);
      request.db.close();
    });
  });
};

/**
 * Gets Versus of Cities
 */
exports.getVersus = (request, response) => {
  const cityName = request.params.city;

  const toReturn = [data[cityName]];

  for (let i = 0; i < 5; i += 1) {
    if (Object.keys(data)[i] !== cityName) {
      toReturn.push(data[Object.keys(data)[i]]);
    }
  }

  response.json(toReturn.map((city) => {
    const { space, name, modalsplit } = city;
    return { space, modalsplit, city: name };
  }));
};

/**
 * Gets Backgroundimage for given City
 */
exports.getCityBackground = (request, response) => {
  const city = request.params.city.charAt(0).toUpperCase() + request.params.city.slice(1);
  response.header('Content-Type', 'image/jpeg');
  response.sendFile(path.join(__dirname, `../../../static/cityBackgrounds/about-${city}.jpg`));
};

/**
 * Gets Landmark for given City
 */
exports.getLandmark = (request, response) => {
  const city = request.params.city.charAt(0).toUpperCase() + request.params.city.slice(1);
  response.header('Content-Type', 'image/svg+xml');
  response.sendFile(path.join(__dirname, `../../../static/cityLandmarks/Landmark_${city}.svg`));
};

/**
 * Generates or responds Gif
 */
exports.generateGif = (request, response) => {
  const redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
  const redisSubscriptionClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

  const city = request.params.city.toLowerCase();
  const street = request.params.street.toLowerCase() || '1';

  const hashIdentifier = sha1(city + street);

  // Existiert in der Liste Gifs ?

  redisClient.exists(`gif.cities.gifs.${hashIdentifier}`, (error, exists) => {
    if (error) console.log(error);
    if (exists === 0) {
      // Schreibe in die liste Requests
      redisClient.rpush('requests', JSON.stringify({ city, street, hash: hashIdentifier }));

      redisSubscriptionClient.on('message', (channel, hash) => {
        if (channel === 'newGif' && hash) {
          if (hash === hashIdentifier) {
            redisClient.get(`gif.cities.gifs.${hash}`, (err, gifData) => {
              if (err) console.log(err);
              redisSubscriptionClient.unsubscribe('newGif');
              response.redirect(gifData);
            });
          }
        }
      });

      redisSubscriptionClient.subscribe('newGif');
    } else {
      // Hole aus der Liste Gifs
      redisClient.get(`gif.cities.gifs.${hashIdentifier}`, (err, gifData) => {
        if (err) console.log(err);
        response.redirect(gifData);
      });
    }
  });


  redisClient.on('error', (message) => error(message));
};

exports.generatePoster = (request, response) => {
  const redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
  const redisSubscriptionClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

  const city = request.params.city.toLowerCase();
  const street = request.params.street.toLowerCase() || '1';

  const hashIdentifier = sha1(city + street);

  // Existiert in der Liste Gifs ?
  redisClient.exists(`gif.cities.posters.${hashIdentifier}`, (error, exists) => {
    if (error) console.log(error);
    if (exists === 0) {
      // Schreibe in die liste Requests
      redisClient.rpush('posterRequests', JSON.stringify({ city, street, hash: hashIdentifier }));

      redisSubscriptionClient.on('message', (channel, hash) => {
        console.log(channel);
        if (channel === 'newPoster' && hash) {
          if (hash === hashIdentifier) {
            redisClient.get(`gif.cities.posters.${hash}`, (err, posterData) => {
              if (err) console.log(err);
              redisSubscriptionClient.unsubscribe('newPoster');
              response.redirect(posterData);
            });
          }
        }
      });

      console.log('subscr');
      redisSubscriptionClient.subscribe('newPoster');
    } else {
      // Hole aus der Liste Gifs
      redisClient.get(`gif.cities.posters.${hashIdentifier}`, (err, posterData) => {
        if (err) console.log(err);
        response.redirect(posterData);
      });
    }
  });


  redisClient.on('error', (message) => error(message));
};

/**
 * Generates or responds Gif
 */
exports.generateMovie = (request, response) => {
  const redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
  const redisSubscriptionClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

  const city = request.params.city.toLowerCase();
  const street = request.params.street.toLowerCase() || '1';

  const hashIdentifier = sha1(city + street);

  // Existiert in der Liste Gifs ?

  redisClient.exists(`gif.cities.movies.${hashIdentifier}`, (error, exists) => {
    if (error) console.log(error);
    if (exists === 0) {
      // Schreibe in die liste Requests
      redisClient.rpush('movieRequests', JSON.stringify({ city, street, hash: hashIdentifier }));

      redisSubscriptionClient.on('message', (channel, hash) => {
        if (channel === 'newMovie' && hash) {
          if (hash === hashIdentifier) {
            redisClient.get(`gif.cities.movies.${hash}`, (err, gifData) => {
              if (err) console.log(err);
              redisSubscriptionClient.unsubscribe('newMovie');
              response.redirect(gifData);
            });
          }
        }
      });

      redisSubscriptionClient.subscribe('newMovie');
    } else {
      // Hole aus der Liste Gifs
      redisClient.get(`gif.cities.movies.${hashIdentifier}`, (err, gifData) => {
        if (err) console.log(err);
        response.redirect(gifData);
      });
    }
  });


  redisClient.on('error', (message) => error(message));
};

/** Searchs for streets */
exports.searchStreets = (request, response) => {
  const term = request.params.term;

  request.db.open((err, database) => {
    const collection = database.collection('streets');

    collection.find({ 'properties.name': new RegExp(term) }, { limit: request.limit }).toArray((error, docs) => {
      if (error) console.log(error);
      const results = docs.map((doc) => ({ id: doc._id, name: doc.properties.name, type: 'street', city: request.params.city })); // eslint-disable-line no-underscore-dangle

      if (docs.length > 0) response.status(200).json(results);
      else response.status(404).send('Not found');
      request.db.close();
    });
  });
};

// Helpers
const error = (message) => console.log(`Error ${message}`);

const getCityByPoint = (ll) => {
  let toReturn = '';

  const latitude = ll[0];
  const longitude = ll[1];

  const cities = Object.keys(data);

  const ipPoint = {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Point",
      "coordinates": ll
    }
  };

  const citiesWithDistance = cities.map((item) => {
    const city = data[item];

    const cityPoint = {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [city.boundingBox[0], city.boundingBox[1]]
      }
    };

    return { 
      slug: item,
      name: city.name, 
      distance: turf.distance(cityPoint, ipPoint) 
    };
  });

  return minBy(citiesWithDistance, "distance");
};

