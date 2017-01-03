const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');

const app = express();

// app.set( 'view engine', 'html' )

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use( logger('dev') );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( cookieParser() );
app.use( express.static(path.join(__dirname, 'public')) );

app.use('/', index);

// catch 404 and forward to error handler
app.use( ( request, response, next ) => {
  let error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// error handler
app.use( ( error, request, response, next ) => {
  // set locals, only providing error in development
  response.locals.message = error.message;
  response.locals.error = request.app.get('env') === 'development' ? error : {};

  // render the error page
  response.status( error.status || 500 );
  response.render( 'error' );
});

module.exports = app;
