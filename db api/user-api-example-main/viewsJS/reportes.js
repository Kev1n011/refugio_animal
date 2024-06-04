const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dbPerdidas = require('../models/reportePerdidas');
const mascota1 = require("../models/mascotas");

router.use(bodyParser.urlencoded({ extended: true }));

// Ruta para servir el formulario de llenar reporte
router.get('/llenar_reporte', (req, res) => {
    mascota1.getAllUsers((err, mascotas) => {
        if (err) {
            console.error('Error al obtener las mascotas:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.render('llenar_reporte', { mascotas });
    });
});

// Ruta para manejar el envío del formulario
// Ruta para manejar el envío del formulario
router.post('/reportes', (req, res) => {
    const { tipoReporte, mascota, descripcion, colonia, calle, ciudad, cp } = req.body;
    const fecha = new Date();

    if (tipoReporte === 'perdida') {
        mascota1.getUserById(mascota, (err, mascotaInfo) => { // Cambia nombreMascota por mascotaInfo
            if (err) {
                console.error('Error al obtener el nombre de la mascota:', err);
                res.status(500).send('Error interno del servidor');
                return;
            }
            const nombreMascota = mascotaInfo.nombre; // Obtener el nombre de la mascota del objeto mascotaInfo
            const newReport = {
                descripcion,
                estado: 'EN ESPERA',
                fecha,
                colonia,
                calle,
                ciudad,
                cp,
                id_mascota: mascota,
                nombre_mascota: nombreMascota // Agregamos el nombre de la mascota al reporte
            };
            dbPerdidas.createUser(newReport, (err, result) => {
                if (err) {
                    console.error('Error al insertar reporte de pérdida:', err);
                    res.status(500).send('Error interno del servidor');
                    return;
                }
                res.redirect('/inicio_usuario');
            });
        });
    } else {
        res.status(400).send('Tipo de reporte no válido');
    }
});



module.exports = router;
