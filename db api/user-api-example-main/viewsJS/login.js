const express = require('express');
const bodyParser = require('body-parser');
const clientesModel = require('../models/clientes');
const empleadosModel = require('../models/empleados');

const router = express.Router();

// Configurar body-parser para analizar solicitudes con cuerpo en formato de formulario
router.use(bodyParser.urlencoded({ extended: true }));

// Ruta para manejar el inicio de sesión
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Primero intenta encontrar el usuario como cliente
    clientesModel.getUserByEmail(email, (err, cliente) => {
        if (err) {
            console.error('Error al verificar las credenciales:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }

        if (cliente) {
            if (cliente.contrasena !== password) {
                res.status(401).send('Contraseña incorrecta');
                return;
            }

            // Las credenciales son válidas, establecer la sesión del usuario como cliente
            req.session.userId = cliente.id;
            req.session.userEmail = email;
            res.cookie('userEmail', email, { httpOnly: true, maxAge: 900000 });
            console.log('Correo guardado en la sesión:', req.session.userEmail);
            res.redirect('/inicio_usuario'); // Redirige a la vista de usuario
            return;
        }

        // Si no se encontró como cliente, intenta como empleado
        empleadosModel.getUserByEmail(email, (err, empleado) => {
            if (err) {
                console.error('Error al verificar las credenciales:', err);
                res.status(500).send('Error interno del servidor');
                return;
            }

            if (!empleado) {
                res.status(401).send('Correo electrónico no encontrado');
                return;
            }

            if (empleado.contrasena !== password) {
                res.status(401).send('Contraseña incorrecta');
                return;
            }

            // Las credenciales son válidas, establecer la sesión del usuario como empleado
            req.session.userId = empleado.id;
            req.session.userEmail = email;
            res.cookie('userEmail', email, { httpOnly: true, maxAge: 900000 });
            console.log('Correo guardado en la sesión:', req.session.userEmail);
            res.redirect('/inicio_empleado'); // Redirige a la vista de empleado
        });
    });
});

module.exports = router;