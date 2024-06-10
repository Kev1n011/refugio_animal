const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dbPerdidas = require('../models/reportePerdidas');
const dbMaltratos = require('../models/reporteMaltratos');
const mascota1 = require("../models/mascotas");

router.use(bodyParser.urlencoded({ extended: true }));

// Ruta para servir el formulario de llenar reporte
router.get('/get-user-email', (req, res) => {
    if (req.session.userEmail) {
        res.json({ email: req.session.userEmail });
    } else {
        res.status(401).send('Usuario no autenticado');
    }
});

router.get('/api/v1/reportePerdidas', (req, res) => {
    const correoUsuario = req.query.correo; // Obtener el correo desde los parámetros de la consulta

    dbPerdidas.getUserByEmail(correoUsuario, (err, reportes) => {
        if (err) {
            console.error('Error al obtener los reportes:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }

        res.json({ datos: { reportes } });
    });
});

router.get('/api/v1/reportePerdidas', (req, res) => {
    const correoUsuario = req.query.correo;

    dbPerdidas.getReportsByEmail(correoUsuario, (err, reportes) => {
        if (err) {
            console.error('Error al obtener los reportes:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }

        res.json({ datos: { reportes } });
    });
});

// Ruta para manejar el envío del formulario
// Ruta para manejar el envío del formulario
router.post('/reportes', (req, res) => {
    const { tipoReporte, mascota, descripcion, colonia, calle, ciudad, cp, correo, imagen_mascota } = req.body;
    console.log('Correo recibido en POST:', correo); // Verificar que se recibe correctamente
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
                nombre_mascota: nombreMascota,
                correo, // Agregamos el nombre de la mascota al reporte
                imagen_mascota
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
    }
    else if (tipoReporte === 'maltrato') {

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
                id_mascota: mascota,
                nombre_mascota: nombreMascota,
                correo, // Agregamos el nombre de la mascota al reporte
                imagen_mascota
            };
            dbMaltratos.createUser(newReport, (err, result) => {
                if (err) {
                    console.error('Error al insertar reporte de pérdida:', err);
                    res.status(500).send('Error interno del servidor');
                    return;
                }
                res.redirect('/inicio_usuario');
            });
        });
       
    }
    else {
        res.status(400).send('Tipo de reporte no válido');
    }
});



router.post('/editarReporte', (req, res) => {
    const { id, nombreMascota, estado, fecha, correo, descripcion } = req.body;

    // Asumiendo que tienes una función para actualizar los reportes en tu modelo de base de datos
    const reporteActualizado = {
        nombre_mascota: nombreMascota,
        estado,
        fecha: new Date(fecha), // Asegúrate de convertir la fecha correctamente
        correo,
        descripcion
    };

    // Asumiendo que `updateReport` es una función en tu modelo de base de datos que actualiza un reporte basado en su ID
    dbMaltratos.updateUser(id, reporteActualizado, (err, result) => {
        if (err) {
            console.error('Error al actualizar el reporte:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.redirect('/reportes_empleado'); // Redirige al usuario a la página de reportes después de actualizar
    });
});

router.post('/editarReportePerdida', (req, res) => {
    const { id, nombreMascota, estado, fecha, correo, descripcion, colonia, calle, ciudad, cp } = req.body;

    // Asumiendo que tienes una función para actualizar los reportes en tu modelo de base de datos
    const reporteActualizado = {
        nombre_mascota: nombreMascota,
        estado,
        fecha: new Date(fecha), // Asegúrate de convertir la fecha correctamente
        correo,
        descripcion,
        colonia,
        calle,
        ciudad,
        cp
    };

    // Asumiendo que `updateReport` es una función en tu modelo de base de datos que actualiza un reporte basado en su ID
    dbPerdidas.updateUser(id, reporteActualizado, (err, result) => {
        if (err) {
            console.error('Error al actualizar el reporte:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.redirect('/reportes_empleado'); // Redirige al usuario a la página de reportes después de actualizar
    });
});

router.delete('/eliminarReportePerdida/:id', (req, res) => {
    const { id } = req.params;
    dbPerdidas.deleteUser(id, (err) => {
        if (err) {
            console.error('Error al eliminar el reporte:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.status(200).send('Reporte eliminado con éxito');
    });
});

router.delete('/eliminarReporte/:id', (req, res) => {
    const { id } = req.params;
    dbMaltratos.deleteUser(id, (err) => {
        if (err) {
            console.error('Error al eliminar el reporte:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.status(200).send('Reporte eliminado con éxito');
    });
});

router.get('/inicio_empleado', async (req, res) => {
    try {
        const totalPerdidas = await dbPerdidas.countAll(); // Asumiendo que esta función existe y devuelve una promesa
        const totalMaltratos = await dbMaltratos.countAll(); // Asumiendo que esta función existe y devuelve una promesa
        const totalMascotas = await mascota1.countAll(); // Asumiendo que esta función existe y devuelve una promesa

        res.render('inicio_empleado', { totalPerdidas, totalMaltratos, totalMascotas });
    } catch (err) {
        console.error('Error al obtener los datos del dashboard:', err);
        res.status(500).send('Error interno del servidor');
    }
});


module.exports = router;
