const express = require('express');
const bodyParser = require('body-parser');
const mascota = require('../models/mascotas');

const router = express.Router();

// Configurar body-parser para analizar solicitudes con cuerpo en formato de formulario
router.use(bodyParser.urlencoded({ extended: true }));




router.post('/registrar_mascota', (req, res) => {
    const { nombre, tipo, raza, edad, sexo, color, peso } = req.body;

    const nuevaMascota = {
        nombre: nombre,
        tipo: tipo,
        raza: raza,
        edad: edad,
        sexo: sexo,
        color: color,
        peso: peso
    };

    // Consultar la base de datos para verificar las credenciales
    mascota.createUser(nuevaMascota, (err, result) => {
        if (err) {
            console.error('Error al crear el usuario:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        // Redirigir al usuario a la página de inicio después del registro exitoso
        res.redirect('/reportes');
    });
});



module.exports = router;
