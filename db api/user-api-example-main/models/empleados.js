const db = require('../config/db');

exports.getAllUsers = (callback) => {
    db.query('SELECT * FROM empleados', (err, rows) => {
        if (err) throw err;
        return callback(null, rows);
    });
};
exports.createUser = (user, callback) => {
    db.query('INSERT INTO empleados SET?', user, (err, result) => {
        if (err) throw err;
        return callback(null, result);
    });
};

// Get a single user by their id    
exports.getUserById = (id, callback) => {
    db.query('SELECT * FROM empleados WHERE id =?', id, (err, rows) => {
        if (err) throw err;
        return callback(null, rows[0]);
    });
};
// Update an existing user
exports.updateUser = (id, user, callback) => {
    db.query('UPDATE empleados SET? WHERE id =?', [user, id], (err, result) => {
        if (err) throw err;
        return callback(null, result);
    });
};
// Delete a user by their id 
exports.deleteUser = (id, callback) => {
    db.query('DELETE FROM empleados WHERE id =?', id, (err, result) => {
        if (err) throw err;
        return callback(null, result);
    });
};


exports.getUserByEmail = (email, callback) => {
    db.query('SELECT * FROM empleados WHERE correoElectronico = ?', email, (err, rows) => {
        if (err) {
            return callback(err, null);
        }
        if (rows.length === 0) {
            // No se encontró ningún usuario con ese correo electrónico
            return callback(null, null);
        }
        // Se encontró un usuario con ese correo electrónico
        return callback(null, rows[0]);
    });
};


