const express = require ('express')
const bodyParser = require('body-parser');
const castracion = require ('../models/servicioCastracion')
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/registrar_castracion', (req, res) => {
    const {costo, fecha_operacion, lista_mascotas} = req.body

        const nuevaCastracion = {
            costo: costo,
            fecha: fecha_operacion,
            id_mascota: lista_mascotas,
        }
        castracion.createUser(nuevaCastracion, (err, result) => {
            if (err) {
                console.error('Error al registrar la castración', err);
                res.status(500).send('Error interno del servidor');
                return;
            }
            res.redirect('/inicio_usuario')
        })
    });

module.exports = router;