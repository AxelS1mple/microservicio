const mysql = require('mysql2');
const fs = require('fs');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    ca: fs.readFileSync(process.env.DB_SSL_CA)
  },
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err.message);
    return;
  }
  console.log('Conectado a MySQL');
});

module.exports = connection;
