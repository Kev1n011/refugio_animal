const express = require('express');
const bodyParser = require('body-parser');
const clientesModel = require('../models/clientes');

const router = express.Router();

// Configurar body-parser para analizar solicitudes con cuerpo en formato de formulario
router.use(bodyParser.urlencoded({ extended: true }));

/*router.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'registro.html'));
});*/


// Ruta para manejar el inicio de sesión
router.post('/register', (req, res) => {
    const {nombre, apellido_paterno, apellido_materno, telefono, email, password, colonia, calle, ciudad, cp, fecha_nacimiento } = req.body;

    const nuevoUsuario = {
        nombre: nombre,
        apellido_paterno: apellido_paterno,
        apellido_materno: apellido_materno,
        telefono: telefono,
        correoElectronico: email,
        contrasena: password,
        colonia: colonia,
        calle: calle,
        ciudad: ciudad,
        cp: cp,
        fechaRegistro: fecha_nacimiento
    };

    // Consultar la base de datos para verificar las credenciales
    clientesModel.createUser(nuevoUsuario, (err, result) => {
        if (err) {
            console.error('Error al crear el usuario:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        // Redirigir al usuario a la página de inicio de sesión después del registro exitoso
        res.redirect('/');
    });
});

module.exports = router;
