const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    port: process.env.MYSQLPORT,
    password:process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to MySQL database");
});



module.exports = connection;