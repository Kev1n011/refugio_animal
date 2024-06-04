const express = require ('express')
const adopcion = require ('../models/adopcion')
const router = express.Router();

router = express.Router()

router.post('/registrar_adopcion', (req, res) => {
    const {nombre_cliente, domicilio_cliente, telefono_cliente, referencias, motivo_adopcion, fecha_adopcion, 
           nombre_mascota} = req.body

    const nuevaAdopcion = {
        nombre_cliente: nombre_cliente,
        domicilio_cliente: domicilio_cliente,
        telefono_cliente: telefono_cliente,
        referencias: referencias,
        motivo_adopcion: motivo_adopcion,
        fecha_adopcion: fecha_adopcion,
        nombre_mascota: nombre_mascota

    }
    adopcion.createUser(nuevaAdopcion, (err) => {
        res.redirect('/inicio_usuario')
    })
})


module.exports = router;