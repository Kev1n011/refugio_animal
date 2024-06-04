const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: "127.0.0.1", 
    user: "root",
    port: 3306, 
    password: "Bahialucila219", 
    database: "refugio_canino" 
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to MySQL database");
});



module.exports = connection;