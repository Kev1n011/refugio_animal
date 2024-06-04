const express = require ('express')
const mascota = require ('../models/mascotas')
const router = express.Router();

router = express.Router()

router.post('/registrar_mascota1', (req, res) => {
    const {nombre, tipo, raza, edad, sexo, color, peso} = req.body

    const nuevaMascota = {
        nombre: nombre,
        tipo: tipo,
        raza: raza,
        edad: edad,
        sexo: sexo,
        color: color,
        peso: peso

    }
    mascota.createUser(nuevaMascota, (err) => {
        res.redirect('/inicio_usuario')
    })
})


module.exports = router;