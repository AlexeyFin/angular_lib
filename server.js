// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const proxy = require('express-http-proxy');
const url = require('url');

// // Get our API routes
// const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/book-library')));

// // Set our api routes
// app.use('/api', api);


const apiProxy = proxy('https://lib-back.esverito.com/', {
  //
  forwardPath: req => url.parse(req.baseUrl).path.slice(4)
});

app.use('/api/*', apiProxy);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/book-library/index.html'));
});


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3002';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
