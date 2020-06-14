const path = require('path');
const logger = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const sassMiddleware = require('node-sass-middleware');

const User = require('./models/user');
const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');

const app = express();

const optionsDB = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  retryWrites: true,
  user: process.env.MONGO_ATLAS_USR,
  pass: process.env.MONGO_ATLAS_PSW,
  authSource: 'admin',
};
const urlDB = process.env.MONGO_ATLAS_URL;

mongoose
  .connect(urlDB, optionsDB)
  .then(() => {
    console.info('Connected to database!');
  })
  .catch((error) => {
    console.error('Connection failed!');
    console.error(error);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    outputStyle: 'compressed',
  })
);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findOne()
    .then((user) => {
      if (!user) {
        const user = new User({ name: 'Wellington', email: 'test@test.com', cart: [] });
        return user.save();
      }
      return user;
    })
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((error) => console.log(error));
});

app.use('/', shopRoutes);
app.use('/admin', adminRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404, 'Page not found!'));
});

// error handler
app.use(function (error, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};

  // render the error page
  res.status(error.status || 500);
  res.render('error', { titlePage: 'Page not found!' });
});

module.exports = app;
