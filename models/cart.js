const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Pastikan path sesuai dengan struktur folder Anda
const Product = require('./product'); // Mengimpor model Product

const Cart = sequelize.define('Cart', {
  cartId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Products', // Nama tabel di database
      key: 'productID' // Nama kolom yang menjadi kunci utama di tabel Products
    }
  },
  jumlah: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
});

// Definisikan relasi one-to-many dari Product ke Cart
Cart.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Cart;
