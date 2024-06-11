const Cliente = require('../models/clientes.js');

// Obtener todos los empleados
const obtenerClientes = (req, res) => {
    Cliente.getAllUsers((err, empleados) => {
        if (err) {
            console.error('Error retrieving employees:', err);
            return res.status(500).json({
                estatus: 'error',
                mensaje: 'Error al obtener empleados de la base de datos'
            });
        }
        res.status(200).json({
            status: 'conexion exitosa',
            datos: {
                empleados: empleados
            }
        });
    });
};

// Obtener un empleado por su id
const obtenerClientesPorId = (req, res) => {
    const { id } = req.params;
    Cliente.getUserById(id, (err, cliente) => {
        if (err) {
            console.error('Error retrieving employee by id:', err);
            return res.status(500).json({
                estatus: 'error',
                mensaje: 'Error al obtener el empleado de la base de datos'
            });
        }
        if (!cliente) {
            return res.status(404).json({
                estatus: 'conexion fallida',
                mensaje: 'Empleado no encontrado'
            });
        }
        res.status(200).json({
            estatus: 'conexion exitosa',
            datos: {
                cliente: cliente
            }
        });
    });
};

// Agregar un nuevo empleado
const agregarCliente = (req, res) => {
    const nuevoCliente = req.body;
    Cliente.createUser(nuevoCliente, (err, result) => {
        if (err) {
            console.error('Error creating employee:', err);
            return res.status(500).json({
                estatus: 'error',
                mensaje: 'Error al agregar el empleado a la base de datos'
            });
        }
        res.status(201).json({
            estatus: 'Conexion exitosa',
            datos: {
                cliente: nuevoCliente
            }
        });
    });
};

// Eliminar un empleado por su id
const borrarCliente = (req, res) => {
    const { id } = req.params;
    Cliente.deleteUser(id, (err, result) => {
        if (err) {
            console.error('Error deleting employee:', err);
            return res.status(500).json({
                estatus: 'error',
                mensaje: 'Error al eliminar el empleado de la base de datos'
            });
        }
        res.status(200).json({
            estatus: 'conexion exitosa',
            datos: {
                mensaje: 'Empleado eliminado correctamente'
            }
        });
    });
};

// Actualizar un empleado existente
const actualizarCliente = (req, res) => {
    const { id } = req.params;
    const clienteActualizado = req.body;
    Cliente.updateUser(id, clienteActualizado, (err, result) => {
        if (err) {
            console.error('Error updating employee:', err);
            return res.status(500).json({
                estatus: 'error',
                mensaje: 'Error al actualizar el empleado en la base de datos'
            });
        }
        res.status(200).json({
            estatus: 'conexion exitosa',
            datos: {
                cliente: clienteActualizado
            }
        });
    });
};

module.exports = {
    obtenerClientes,
    obtenerClientesPorId,
    agregarCliente,
    borrarCliente,
    actualizarCliente
};
