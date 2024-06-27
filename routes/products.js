const express = require('express');
const router = express.Router();
const Cart = require('../models/cart'); // Mengimpor model Cart
const Product = require('../models/product'); // Mengimpor model Product

// Rute POST untuk menambahkan produk ke dalam keranjang
router.post('/add-to-cart', function(req, res, next) {
  const { productId, jumlah } = req.body;

  // Cek apakah produk tersedia
  Product.findByPk(productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      // Simpan produk ke dalam keranjang
      return Cart.create({
        productId: productId,
        jumlah: jumlah // Properti jumlah disesuaikan dengan model Cart
      });
    })
    .then(cartItem => {
      res.status(201).json(cartItem);
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to add product to cart' });
    });
});

// Rute GET untuk melihat semua item dalam keranjang
router.get('/view-cart', function(req, res, next) {
  Cart.findAll({
    include: [{ model: Product, attributes: ['productName', 'price'] }]
  })
    .then(cartItems => {
      res.json(cartItems);
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to retrieve cart items' });
    });
});

module.exports = router;
