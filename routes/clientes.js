const express = require('express');
const {
     obtenerClientes,
     agregarCliente, 
     obtenerClientesPorId,
     borrarCliente,
     actualizarCliente
    } = require ('./../controladores/clientes')
const router = express.Router();


router.get('/', obtenerClientes );

router.get('/:id', obtenerClientesPorId);

router.post('/', agregarCliente);

router.delete('/:id', borrarCliente);

router.patch('/:id', actualizarCliente);

module.exports = router;