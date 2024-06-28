const { Sequelize } = require('sequelize');
 // Konfigurasi koneksi Sequelize
const sequelize = new Sequelize('dpsi_7', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
    
});
 // Uji koneksi
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
 // Ekspor instance sequelize untuk digunakan di tempat lain
 module.exports = sequelize;