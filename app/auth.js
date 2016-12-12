const path = require('path')
const scrambler = require('./scrambler')
const words = require('random-words');
const cookieName = words({ exactly: 5, join: '-' })

function login(req, res) {
  // res.cookie(cookieName, scrambler.encrypt('logged in'))
  res.sendFile(path.join(__dirname, '..', 'client', 'login.html'))
}

function authorize(req, res) {
  console.log(req.body)

  // do some checking

  res.cookie(cookieName, scrambler.encrypt('logged in'))
  res.redirect("/")
}

function is_logged_in(req, res, next) {
  const status = req.cookies[cookieName] ? scrambler.decrypt(req.cookies[cookieName]) : 'logged out'
  console.log(status)
  if(status == 'logged in') {
    next()
  } else {
    res.redirect("/login")
  }
}

function logout(req, res) {
  res.clearCookie(cookieName)
  res.redirect("/login")
}

exports.init = (app) => {

  // auth routes
  app.get("/login", login)
  app.post("/login", authorize)
  app.get("/logout", logout)

  // main application
  app.get("/", is_logged_in, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'))
  })
}
