var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

/* API Documentation */
app.set('views', path.join(__dirname, 'docs'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'docs')));

/* Express Routing */
var expressRouter = require('./connect/expressRouter');
expressRouter(app);

/*

    ./bin/dbConnect.js 에서 작성한
    커스텀 DB 커넥터로 DB 연결

    1. user_auth : 사용자 인증 DB 에 연결

*/
var dbConnect = require('./connect/dbConnect');
dbConnect('user_auth');

/*

    ./bin/mqttConnect.js 에서 작성한
    mqtt 커넥터로 브로커 연결 및 라우팅

*/
var mqttConnect = require('./connect/mqttConnect');
mqttConnect();

/// catch 404 and forwarding to error handler
app.use(require('./utill/logHandler'));
app.use(require('./utill/successHandler'));
app.use(require('./utill/errorHandler'));
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// /// error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err,
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {},
//   });
// });

module.exports = app;
