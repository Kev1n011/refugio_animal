const db = require('../config/db');

exports.getAllUsers = (callback) => {
    db.query('SELECT * FROM reporteMaltratos', (err, rows) => {
        if (err) throw err;
        return callback(null, rows);
    });
};
exports.createUser = (user, callback) => {
    db.query('INSERT INTO reporteMaltratos SET?', user, (err, result) => {
        if (err) throw err;
        return callback(null, result);
    });
};

// Get a single user by their id    
exports.getUserById = (id, callback) => {
    db.query('SELECT * FROM reporteMaltratos WHERE id =?', id, (err, rows) => {
        if (err) throw err;
        return callback(null, rows[0]);
    });
};
// Update an existing user
exports.updateUser = (id, user, callback) => {
    db.query('UPDATE reporteMaltratos SET? WHERE id =?', [user, id], (err, result) => {
        if (err) throw err;
        return callback(null, result);
    });
};
// Delete a user by their id 
exports.deleteUser = (id, callback) => {
    db.query('DELETE FROM reporteMaltratos WHERE id =?', id, (err, result) => {
        if (err) throw err;
        return callback(null, result);
    });
};

exports.getUserByEmail = (correo, callback) => {
    db.query('SELECT * FROM reporteMaltratos WHERE correo = ?', [correo], (err, rows) => {
        if (err) throw err;
        return callback(null, rows);
    });
};


