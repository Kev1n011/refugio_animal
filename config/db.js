const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: "viaduct.proxy.rlwy.net", 
    user: "root",
    port: 16984, 
    password: "DrPSlGiLCVkdLmmMXLOxEOibroFySriN", 
    database: "railway" 
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to MySQL database");
});



module.exports = connection;