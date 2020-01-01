const express = require('express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const debug = require('debug')('server');
const config = require('./config');

//Express app initialization
var app = express();
app.set('port', process.env.PORT || 3000);

//Serving public static files
app.use(express.static(path.join(__dirname, 'public')));

//Setting up bodyParser
app.use(bodyParser.urlencoded(config.bodyParser));
app.use(bodyParser.json(config.bodyParser));
app.use(bodyParser.raw(config.bodyParser));

app.use((req, res, next) => {
  debug(`Request ${req.method} ${req.url}`);
  next();
})

app.use(require('./routes'))

app.listen(app.get('port'), () => {
  debug(`Listening on port ${app.get('port')}`);
})