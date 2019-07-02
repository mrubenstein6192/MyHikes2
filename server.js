const express = require('express');
const routes = require('./routes');
const passportSetup = require('./middleware/passport-setup');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use(routes);

// connect to mongodb
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/myhikes2';
mongoose.connect(mongoUri, {
  useNewUrlParser: true
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});