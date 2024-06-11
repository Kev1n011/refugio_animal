const express = require('express');
const {
     obtenerMascota,
     obtenerMascotasPorId,
     agregarMascota,
     borrarMascota,
     actualizarMascota

     
    } = require ('./../controladores/mascotas')
const router = express.Router();

router.get('/', obtenerMascota);

router.get('/:id', obtenerMascotasPorId);

router.post('/', agregarMascota);

router.delete('/:id', borrarMascota);

router.patch('/:id', actualizarMascota);

module.exports = router;