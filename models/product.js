// models/product.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Pastikan path sesuai dengan struktur folder Anda

const Product = sequelize.define('Product', {
  productID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = Product;
