const express = require ('express')
const bodyParser = require('body-parser');
const adopcion = require ('../models/adopcion')
const mascota1 = require("../models/mascotas");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/registrar_adopcion', (req, res) => {
    const {nombre, domicilio, telefono, referencias, motivo, fecha_adopcion, lista_mascotas} = req.body

    mascota1.getUserById(lista_mascotas, (err, mascotaInfo) => {
        if (err) {
            console.error('Error al obtener el nombre de la mascota:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        const nombreMascota = mascotaInfo.nombre;

        const nuevaAdopcion = {
            nombreCliente: nombre,
            domicilioCliente: domicilio,
            telefonoCliente: telefono,
            referencias: referencias,
            motivoAdopcion: motivo,
            fechaAdopcion: fecha_adopcion,
            nombreMascota: nombreMascota
        }
        adopcion.createUser(nuevaAdopcion, (err, result) => {
            if (err) {
                console.error('Error al registrar la adopción', err);
                res.status(500).send('Error interno del servidor');
                return;
            }
            // Enviar una respuesta de éxito al cliente
            res.status(200).send({ message: 'Adopción registrada exitosamente' });
        })
    });

})

module.exports = router;