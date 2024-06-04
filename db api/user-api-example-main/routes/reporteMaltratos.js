const express = require('express');
const {
     obtenerReportes,
     agregarReporte, 
     obtenerReportesPorId,
     borrarReporte,
     actualizarReporte
    } = require ('./../controladores/reporteMaltratos')
const router = express.Router();


router.get('/', obtenerReportes );

router.get('/:id', obtenerReportesPorId);

router.post('/', agregarReporte);

router.delete('/:id', borrarReporte);

router.patch('/:id', actualizarReporte);

module.exports = router;