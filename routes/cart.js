const express = require('express');
const router = express.Router();
const Cart = require('../models/cart'); // Mengimpor model Cart
const Product = require('../models/product'); // Mengimpor model Product

// Rute POST untuk menambahkan produk ke dalam keranjang
router.post('/add-to-cart', async function(req, res, next) {
  const { productId, jumlah } = req.body;

  try {
    // Cek apakah produk tersedia
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Simpan produk ke dalam keranjang
    const cartItem = await Cart.create({
      productId: productId,
      quantity: jumlah // Pastikan properti yang digunakan sesuai dengan definisi model Cart
    });

    res.status(201).json(cartItem);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to add product to cart' });
  }
// Rute GET untuk melihat semua item dalam keranjang
  router.get('/view-cart', async function(req, res, next) {
    try {
      const cartItems = await Cart.findAll({
        include: [{ model: Product, attributes: ['productName', 'price'] }]
      });
  
      res.json(cartItems);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to retrieve cart items' });
    }
  });
  
});

module.exports = router;
