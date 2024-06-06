const express = require('express');
const {
     obtenerReportes,
     agregarReporte, 
     obtenerReportesPorId,
     borrarReporte,
     actualizarReporte,
     obtenerReportesPorCorreo // Importar la nueva función
    } = require('./../controladores/reportePerdidas');
const router = express.Router();
router.get('/porCorreo', obtenerReportesPorCorreo); // Cambiado para usar como parámetro de consulta

router.get('/', obtenerReportes);
router.get('/:id', obtenerReportesPorId);
router.post('/', agregarReporte);
router.delete('/:id', borrarReporte);
router.patch('/:id', actualizarReporte);

module.exports = router;