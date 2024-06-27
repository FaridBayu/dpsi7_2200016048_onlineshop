var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Data model
var sequelize = require('./models/index'); // Impor sequelize
var Product = require('./models/product'); // Impor model Product
var Cart = require('./models/cart'); // Impor model Cart

// Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var cartRouter = require('./routes/cart'); // Impor router cart

var app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter); // Menggunakan router products untuk endpoint terkait produk
app.use('/cart', cartRouter); // Menggunakan router cart untuk endpoint terkait keranjang

// Middleware untuk menangani 404 Not Found
app.use(function(req, res, next) {
  next(createError(404));
});

// Middleware untuk menangani error
app.use(function(err, req, res, next) {
  // Set locals, hanya memberikan error pada pengembangan
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render halaman error
  res.status(err.status || 500);
  res.render('error');
});

// Sinkronkan model dengan database
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });

module.exports = app;
