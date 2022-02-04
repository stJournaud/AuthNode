module.exports = (app) => {
    app.get('/', requireLogin, (req, res) => {
        let Controller = require('../controllers/Home.js');
        (new Controller).print(req, res);
    });

    app.get('/register', (req, res) => {
        let Controller = require('../controllers/Register.js');
        (new Controller).print(req, res);
    });

    app.get('/login', (req, res) => {
        let Controller = require('../controllers/Login.js');
        (new Controller).print(req, res);
    });

    app.get('/logout', (req, res) => {
        let Controller = require('../controllers/Logout.js');
        (new Controller).logout(req, res);
    });

    app.post('/register', (req, res) => {
        let Controller = require('../controllers/Register.js');
        (new Controller).register(req, res);
    });

    app.post('/login', (req, res) => {
        let Controller = require('../controllers/Login.js');
        (new Controller).login(req, res);
    })

};

function requireLogin(req, res, next) {
    if (req.session.loggedIn) {
      next(); // allow the next route to run
    } else {
      // require the user to log in
      res.redirect("/login"); // or render a form, etc.
    }
  }