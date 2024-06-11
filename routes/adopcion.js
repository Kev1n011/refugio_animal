const express = require('express');
const {
     obtenerAdopciones,
     obtenerAdopcionesPorId,
     agregarAdopcion,
     borrarAdopcion,
     actualizarAdopcion
    } = require ('./../controladores/adopcion')
const router = express.Router();


router.get('/', obtenerAdopciones );

router.get('/:id', obtenerAdopcionesPorId);

router.post('/', agregarAdopcion);

router.delete('/:id', borrarAdopcion);

router.patch('/:id', actualizarAdopcion);

module.exports = router;