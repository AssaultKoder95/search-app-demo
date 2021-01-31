const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const requestInitializer = require('./backend/middlewares/requestInitializer');
const location = require('./backend/routes/location');
const dbClient = require('./backend/database');

const app = express();
const SERVER_PORT = 5600;
const PORT = process.env.PORT || SERVER_PORT;

app.initializationComplete = false;

dbClient.initializeDB().then(() => {
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(requestInitializer);

  app.use('/location', location);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  app.initializationComplete = true;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

module.exports = app;