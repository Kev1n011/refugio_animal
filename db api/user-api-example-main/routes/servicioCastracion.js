const express = require('express');
const {
     obtenerServicio,
     obtenerServicioPorId,
     agregarServicio,
     actualizarServicio,
     borrarServicio

     
    } = require ('../controladores/servicioCastracion')
const router = express.Router();

router.get('/', obtenerServicio);

router.get('/:id', obtenerServicioPorId);

router.post('/', agregarServicio);

router.delete('/:id', borrarServicio);

router.patch('/:id', actualizarServicio);

module.exports = router;