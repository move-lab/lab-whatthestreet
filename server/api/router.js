const fs = require('fs');
const assert = require('assert');

const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const RateLimit = require('express-rate-limit');
const data = require('./cityMeta.json');

// Routes
const cityRoute = require('./routes/cityRoute');
const guessRoute = require('./routes/guessRoute');

router.get('/', require('./routes/rootRoute'));

// load documentDB cert + options
let mongoOptions = { useUnifiedTopology: true, useNewUrlParser: true };
let mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017';

if (process.env.NODE_ENV === 'production') {
  if (process.env.MONGODB_USER && process.env.MONGODB_PASSWORD) {
    mongoUrl = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${
      mongoUrl.split('//')[1]
    }`;
  }

  if (process.env.MONGODB_SSL) {
    const ca = [fs.readFileSync('./rds-combined-ca-bundle.pem')];

    mongoOptions = {
      ...mongoOptions,
      ssl: true,
      sslValidate: true,
      sslCA: ca
    };
  }
}

// NearestCity route
router.route('/nearestCity').post(cityRoute.getNerestCity);

// Closest city to guesss
router.route('/closestCityToGuess').post(cityRoute.closestCityToGuess);

// City Routes
router.route('/cities/').get(require('./routes/cityRoute').getAllCities);

// Select Database and Validate Params
router.use('/cities/:city', (request, response, next) => {
  if (Object.keys(data).find(city => request.params.city === city)) {
    MongoClient.connect(mongoUrl, mongoOptions, (err, client) => {
      assert.strictEqual(null, err);

      db = client.db(`${request.params.city}_coiled_2`);
      request.db = db;
      request.mongoClient = client;
      request.limit = parseInt(request.query.limit, 10) || 10;
      request.params.city = request.params.city.toLowerCase();
      next();
    });
  } else {
    response.status(404).send(`This city does not exists`);
  }
});

router.route('/cities/:city').get(cityRoute.getInfo);

router.route('/cities/:city/streets').get(cityRoute.getStreets);
router.route('/cities/:city/streets/:vehicle/:id').get(cityRoute.getStreetByID);
router.route('/cities/:city/versus').get(cityRoute.getVersus);
router.route('/cities/:city/landmark').get(cityRoute.getLandmark);

router.route('/citiesBackground/:city').get(cityRoute.getCityBackground);

// Validate Params
router.use('/cities/:city/:vehicle', (request, response, next) => {
  request.params.vehicle = request.params.vehicle.toLowerCase();
  next();
});

// Guesses

// Save guess limiter
var saveGuessLimiter = new RateLimit({
  windowMs: 60000, // 1 min
  max: 1, // start blocking after 1 requests
  message: 'Too many guesses are being recorded from that IP address'
});

router.post('/cities/:city/guess', saveGuessLimiter, guessRoute.insertGuess);
router.route('/cities/:city/guess').get(guessRoute.getAllGuesses);

module.exports = router;
