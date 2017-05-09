const express = require('express')
const next = require('next')
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
  server.use('/api/v1', router);

  // Routes handled by next.js
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(process.env.PORT || 3000, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${process.env.PORT || 3000}`)
  })
})
