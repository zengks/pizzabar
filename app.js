var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var orderRouter = require('./routes/orderRoute');
var websiteRouter = require('./routes/websiteRoute');

var app = express();

const session = require('cookie-session');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');

app.use(session({keys: ['trustKey1', 'trustKey2', 'trustKey3']}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

const Account = require('./models/Account');
passport.use(new LocalStrategy(Account.authenticate()));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

mongoose.connect('mongodb://localhost:27017/a01222657', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;

db.on('error', () => {
  console.log('Failed to connect to mongodb. Exiting...');
  process.exit(1);
});

db.once('open', function () {
  // we're connected!
  console.log('Connected to mongodb instance successfully');
});

process.on('SIGINT', () => {
  console.log("Stopping the app....");
  mongoose.connection.close((err) => {
    console.log("Closing the connection...");
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/order', orderRouter);
app.use('/', websiteRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
