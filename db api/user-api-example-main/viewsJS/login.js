const express = require('express');
const bodyParser = require('body-parser');
const clientesModel = require('../models/clientes');

const router = express.Router();

// Configurar body-parser para analizar solicitudes con cuerpo en formato de formulario
router.use(bodyParser.urlencoded({ extended: true }));

// Ruta para manejar el inicio de sesión
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Consultar la base de datos para verificar las credenciales
    clientesModel.getUserByEmail(email, (err, cliente) => {
        if (err) {
            console.error('Error al verificar las credenciales:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }

        if (!cliente) {
            res.status(401).send('Correo electrónico no encontrado');
            return;
        }

        if (cliente.contrasena !== password) {
            res.status(401).send('Contraseña incorrecta');
            return;
        }

        // Las credenciales son válidas, establecer la sesión del usuario
        req.session.userId = cliente.id;
        req.session.userEmail = email;
        res.cookie('userEmail', email, { httpOnly: true, maxAge: 900000 }); // Ajusta las opciones según tus necesidades
        console.log('Correo guardado en la sesión:', req.session.userEmail);
        res.redirect('/inicio_usuario');
    });
});

module.exports = router;
