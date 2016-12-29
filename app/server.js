const async = require('async')
const express = require('express')
var app = express()

/*
  Setup application
  1. Initialize logger
  2. Body and Cookie Parsing
  3. Initialize database
  4. Serve Static Files
  5. Initialize socket connection
  success: Start Server
  failure: Log Error Message
 */

async.waterfall([
  (done) => { require('./models/logger').init(app, done) },
  (done) => { require('./models/parsing').init(app, done) },
  (done) => { require('./database/database').init(app, done) },
  (done) => { require('./models/static-files').init(app, done) },
  (done) => { console.log('4'); done() },
  (done) => { console.log('5'); done() },
  (done) => { console.log('6'); done() },
], (err, result) => {

})

// set up server
// const PORT = process.env.PORT || 8080
// app.set('port', PORT)
// var server = require('http').Server(app)
//
// // external routes
// require('./auth').init(app)
//
// // Socket.io Communication
// var io = require('socket.io').listen(server)
// var socketCookieParser = require('socket.io-cookie')
// io.use(socketCookieParser)
// require('./models/room').initializeSocket(io)
//
// // start service
// server.listen(PORT, () => {
//     logger.info("Server started on port " + PORT)
// })
