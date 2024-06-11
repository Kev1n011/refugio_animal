const express = require('express');
const bodyParser = require('body-parser');
const clientesModel = require('../models/clientes');
const empleadosModel = require('../models/empleados');
const bcrypt = require('bcrypt');
const saltRounds = 10; 

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.post('/register', async (req, res) => {
    const {nombre, apellido_paterno, apellido_materno, telefono, email, password, colonia, calle, ciudad, cp, fecha_nacimiento } = req.body;

    try {
        // Verificar si el correo electrónico ya está registrado
        clientesModel.findByEmail(email, async (err, emailExists) => {
            if (err) {
                console.error('Error al verificar el correo electrónico:', err);
                res.status(500).send('Error interno del servidor al verificar el correo electrónico');
                return;
            }
            if (emailExists) {
                res.status(409).send('Ya existe un usuario registrado con ese correo electrónico.');
                return;
            }

            const hashedPassword = await bcrypt.hash(password, saltRounds); // Cifrar la contraseña

            const nuevoUsuario = {
                nombre: nombre,
                apellido_paterno: apellido_paterno,
                apellido_materno: apellido_materno,
                telefono: telefono,
                correoElectronico: email,
                contrasena: hashedPassword, 
                colonia: colonia,
                calle: calle,
                ciudad: ciudad,
                cp: cp,
                fechaRegistro: fecha_nacimiento
            };

            clientesModel.createUser(nuevoUsuario, (err, result) => {
                if (err) {
                    console.error('Error al crear el usuario:', err);
                    res.status(500).send('Error interno del servidor');
                    return;
                }
                res.redirect('/');
            });
        });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).send('Error al procesar la solicitud');
    }
});


router.post('/registro_empleado', async (req, res) => {
    const {nombre, telefono, email, password, colonia, ciudad, cp, fecha_nacimiento, sueldo } = req.body;

    try {
        // Verificar si el correo electrónico ya está registrado
        empleadosModel.findByEmail(email, async (err, emailExists) => {
            if (err) {
                console.error('Error al verificar el correo electrónico:', err);
                res.status(500).send('Error interno del servidor al verificar el correo electrónico');
                return;
            }
            if (emailExists) {
                res.status(409).send('Ya existe un usuario registrado con ese correo electrónico.');
                return;
            }
            

            const hashedPassword = await bcrypt.hash(password, saltRounds); // Cifrar la contraseña

            const nuevoUsuario = {
                nombre: nombre,
                telefono: telefono,
                correoElectronico: email,
                contrasena: hashedPassword, 
                colonia: colonia,
                ciudad: ciudad,
                cp: cp,
                fechaNacimiento: fecha_nacimiento,
                sueldo: sueldo
            };

            empleadosModel.createUser(nuevoUsuario, (err, result) => {
                if (err) {
                    console.error('Error al crear el usuario:', err);
                    res.status(500).send('Error interno del servidor');
                    return;
                }
                res.redirect('/inicio_empleado');
            });
        });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).send('Error al procesar la solicitud');
    }
});

module.exports = router;