const express = require('express');
const router = express.Router();
const Db = require('mongodb').Db;
const Server = require('mongodb').Server;

router.get('/', require('./routes/rootRoute'));

// Routes
const cityRoute = require('./routes/cityRoute');
const guessRoute = require('./routes/guessRoute');


// City Routes
router.route('/cities/').get(require('./routes/cityRoute').getAllCities);

// Select Database and Validate Params
router.use('/cities/:city', (request, response, next) => {
  request.db = new Db(`${request.params.city}_coiled`, new Server(process.env.MONGODB_HOST || 'localhost', 27017));
  request.limit = parseInt(request.query.limit, 10) || 10;
  request.params.city = request.params.city.toLowerCase();
  next();
});

router.route('/cities/nearest').get(cityRoute.getNerestCity);
router.route('/cities/:city').get(cityRoute.getInfo);

router.route('/cities/:city/streets').get(cityRoute.getStreets);
router.route('/cities/:city/streets/:vehicle/:id').get(cityRoute.getStreetByID);
router.route('/cities/:city/background').get(cityRoute.getCityBackground);
router.route('/cities/:city/versus').get(cityRoute.getVersus);
router.route('/cities/:city/landmark').get(cityRoute.getLandmark);

// Searching
router.route('/cities/:city/search_street/:term').get(cityRoute.searchStreets);

router.route('/closestCityToGuess').post(cityRoute.closestCityToGuess);

// Gif
router.route('/gif/:city/:street/gif').get(cityRoute.generateGif);
router.route('/gif/:city/:street/poster').get(cityRoute.generatePoster);
router.route('/gif/:city/:street/movie').get(cityRoute.generateMovie);

// Validate Params
router.use('/cities/:city/:vehicle', (request, response, next) => {
  request.params.vehicle = request.params.vehicle.toLowerCase();
  next();
});

// Guesses
router.route('/cities/:city/guess').get(guessRoute.getAllGuesses);
router.route('/cities/:city/guess').post(guessRoute.insertGuess);

module.exports = router;
