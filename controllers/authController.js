const userModel = require('../models/userModel');

module.exports = {
  getLogin: (req, res) => {
    res.render('login');
  },

  getRegistration: (req, res) => {
    res.render('registration');
  },

  postRegistration: async (req, res) => {
    const { username, password } = req.body;
    await userModel.createUser(username, password);
    res.redirect('/');
  },

  postLogin: async (req, res) => {
    const { username, password } = req.body;
    const user = userModel.findByUsername(username);

    if (user && await bcrypt.compare(password, user.password)) {
      req.session.userId = user.username;
      res.cookie('sessionID', req.sessionID);
      res.redirect('/dashboard');
    } else {
      res.redirect('/');
    }
  },

  getDashboard: (req, res) => {
    if (req.session.userId && req.cookies.sessionID === req.sessionID) {
      res.render('dashboard', { username: req.session.userId });
    } else {
      res.redirect('/');
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie('sessionID');
    res.redirect('/');
  },
};
