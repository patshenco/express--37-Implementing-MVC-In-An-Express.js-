const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

// Import Controllers
const authController = require('./controllers/authController');

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

// Set up EJS views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Define Routes
app.get('/', authController.getLogin);
app.get('/register', authController.getRegistration);
app.post('/register', authController.postRegistration);
app.post('/login', authController.postLogin);
app.get('/dashboard', authController.getDashboard);
app.get('/logout', authController.logout);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
