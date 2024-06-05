const express = require ('express')
const bodyParser = require('body-parser');
const vacuna = require ('../models/vacunas')
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/registrar_vacuna', (req, res) => {
    const {nombre_cientifico, nombre_comun, efectos_secundarios, dosis, fecha_vacunacion, lista_mascotas} = req.body

        const nuevaVacunacion = {
            nombreCientifico: nombre_cientifico,
            nombreComun: nombre_comun,
            efectosSecundarios: efectos_secundarios,
            numeroDosis: dosis,
            fechaVacunacion: fecha_vacunacion,
            id_mascota: lista_mascotas
        }
        vacuna.createUser(nuevaVacunacion, (err, result) => {
            if (err) {
                console.error('Error al registrar la vacunacion', err);
                res.status(500).send('Error interno del servidor');
                return;
            }
            res.redirect('/inicio_usuario')
        })
    });


module.exports = router;