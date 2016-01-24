var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var passport = require('passport');
mongoose.connect('mongodb://localhost/db');
require('./models/school');
require('./models/user');
require('./models/competition');
require('./models/submission');
require('./models/judge');
require('./models/match');
require('./models/round');
require('./config/passport');

var routes = require('./routes/index');
var users = require('./routes/users');
var schools = require('./routes/school');
var submissions = require('./routes/submission');
var competitions = require('./routes/competition');
var judges = require('./routes/judge');
var rounds = require('./routes/round');
var matches = require('./routes/match');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('json spaces', 2);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', routes);
app.use('/users', users);
app.use('/schools', schools);
app.use('/submissions', submissions);
app.use('/competitions', competitions);
app.use('/judges', judges);
app.use('/rounds', rounds);
app.use('matches', matches);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
