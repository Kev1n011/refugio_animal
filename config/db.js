const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: "viaduct.proxy.rlwy.net",
    user: "root",
    port: 16984,
    password: "DrPSlGiLCVkdLmmMXLOxEOibroFySriN",
    database: "railway",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
    }

    if (connection) connection.release();
    return;
});

module.exports = pool;