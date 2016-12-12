const path = require('path')
const scrambler = require('./scrambler')
const cookieName = words({ exactly: 5, join: '-' })

function login(req, res) {
  res.cookie(cookieName, scrambler.encrypt('logged in'))
  res.redirect("/")
}

function logout(req, res) {
  res.clearCookie(cookieName)
  res.redirect("/")
}

exports.init = (app) => {

  // auth routes
  app.get("/login", login)
  app.get("/logout", logout)

  // main application
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'))
  })
}
