const path = require('path')
const room = require('./models/room')
const profile = require('./models/profile')
const logger = require('./logger')

function login(req, res) {
  res.sendFile(path.join(__dirname, '..', 'client', 'login.html'))
}

function authorize(req, res) {
  logger.debug(req.body)

  // do some checking

  res.cookie('email', req.body.email)
  res.redirect("/")
}

function is_logged_in(req, res, next) {
  const status = req.cookies.email ? true : false
  status ? next() : res.redirect("/login")
}

function logout(req, res) {
  ['email', 'io'].forEach(cookie => res.clearCookie(cookie))
  res.redirect("/login")
}

exports.init = (app) => {

  // auth routes
  app.get("/login", login)
  app.post("/login", authorize)
  app.get("/logout", logout)

  // rooms
  app.get("/api/rooms/:roomId", is_logged_in, room.getRoomMessages)
  app.get("/api/profiles", is_logged_in, profile.getProfile)
  app.get("/api/settings", is_logged_in, profile.getSettings)

  // main application
  app.get("/", is_logged_in, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'))
  })
}
