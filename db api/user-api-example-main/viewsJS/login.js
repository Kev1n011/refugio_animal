const express = require('express');
const bodyParser = require('body-parser');
const clientesModel = require('../models/clientes');
const empleadosModel = require('../models/empleados');
const bcrypt = require('bcrypt');


const router = express.Router();


router.use(bodyParser.urlencoded({ extended: true }));

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    clientesModel.getUserByEmail(email, (err, cliente) => {
        if (err) {
            console.error('Error al verificar las credenciales:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }

        if (!cliente) {
            // Si no se encuentra un cliente, buscar en empleados
            empleadosModel.getUserByEmail(email, (err, empleado) => {
                if (err) {
                    console.error('Error al verificar las credenciales:', err);
                    res.status(500).send('Error interno del servidor');
                    return;
                }

                if (!empleado) {
                    res.status(404).send('Correo no encontrado');
                    return;
                }

                bcrypt.compare(password, empleado.contrasena, (err, isMatch) => {
                    if (err) {
                        console.error('Error al verificar la contraseña:', err);
                        res.status(500).send('Error interno del servidor');
                        return;
                    }

                    if (!isMatch) {
                        res.status(401).send('Contraseña incorrecta');
                        return;
                    }

                    req.session.userId = empleado.id;
                    req.session.userEmail = email;
                    res.cookie('userEmail', email, { httpOnly: true, maxAge: 900000 });
                    console.log('Correo guardado en la sesión:', req.session.userEmail);
                    res.redirect('/inicio_empleado');
                });
            });
        } else {
            bcrypt.compare(password, cliente.contrasena, (err, isMatch) => {
                if (err) {
                    console.error('Error al verificar la contraseña:', err);
                    res.status(500).send('Error interno del servidor');
                    return;
                }

                if (!isMatch) {
                    res.status(401).send('Contraseña incorrecta');
                    return;
                }

                req.session.userId = cliente.id;
                req.session.userEmail = email;
                res.cookie('userEmail', email, { httpOnly: true, maxAge: 900000 });
                console.log('Correo guardado en la sesión:', req.session.userEmail);
                res.redirect('/inicio_usuario');
            });
        }
    });
});
module.exports = router;