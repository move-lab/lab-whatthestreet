const express = require('express')
const next = require('next')
const compression = require('compression');
const bodyParser = require('body-parser');
const router = require('./api/router');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  // API routes
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());
  server.use(compression());
  server.use('/api/v1', router);

  server.get('/city/:cityName/explore', (req, res) => {
    console.log('handled by /city/:cityName/explore');
    return app.render(req, res, '/explore', req.query);
  })

  server.get('/city/:cityName', (req, res) => {
    console.log('handled by /city/:cityName');
    const cityName = req.params.cityName;
    return app.render(req, res, '/', req.query);
  })

  server.get('*', (req, res) => {
    console.log('handled by next.js *');
    return handle(req, res)
  })

  server.listen(process.env.PORT || 4000, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${process.env.PORT || 4000}`)
  })
})
