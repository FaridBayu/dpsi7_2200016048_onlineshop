// app.js
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var categoriesRouter = require('./routes/categories'); // Impor rute categories
var authRouter = require('./routes/auth');// Impor rute auth
var supplierRouter = require('./routes/suppliers'); // Impor router suppliers

var sequelize = require('./models/index'); // Tambahkan ini untuk memuat 
var Category = require('./models/category'); // Impor model Category
var Supplier = require('./models/supplier'); // Impor model Supplier
var Product = require('./models/product'); // Impor model Product

var shipper = require('./models/shipper');// Impor model shipper     
var customer = require('./models/customer');// Impor model customer
var employee = require('./models/employee');// Impor model emploeey
var order = require('./models/order'); // Impor model order
var orderDetail = require('./models/orderDetail');// Impor model orderdetail

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter); // Gunakan rute produk
app.use('/categories', categoriesRouter); // Gunakan rute categories
app.use('/suppliers', supplierRouter); // Gunakan router suppliers
app.use('/auth', authRouter); // Gunakan rute auth

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

sequelize.sync()
 .then(() => {
 console.log('Database synchronized');
 })
 .catch(err => {
 console.error('Error synchronizing database:', err);
 });

module.exports = app;
