const express = require('express');
const {
    obtenerVacunas,
    obtenerVacunasPorId,
    agregarVacuna,
    borrarVacuna,
    actualizarVacuna

     
    } = require ('./../controladores/vacunas')
const router = express.Router();

router.get('/', obtenerVacunas);

router.get('/:id', obtenerVacunasPorId);

router.post('/', agregarVacuna);

router.delete('/:id', borrarVacuna);

router.patch('/:id', actualizarVacuna);

module.exports = router;