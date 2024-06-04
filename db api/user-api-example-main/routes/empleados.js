const express = require('express');
const {
     obtenerEmpleados,
     obtenerEmpleadosPorId,
     agregarEmpleado,
     borrarEmpleado,
     actualizarEmpleado

     
    } = require ('./../controladores/empleados')
const router = express.Router();

router.get('/', obtenerEmpleados);

router.get('/:id', obtenerEmpleadosPorId);

router.post('/', agregarEmpleado);

router.delete('/:id', borrarEmpleado);

router.patch('/:id', actualizarEmpleado);

module.exports = router;