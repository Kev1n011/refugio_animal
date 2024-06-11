const Empleado = require('../models/empleados');

// Obtener todos los empleados
const obtenerEmpleados = (req, res) => {
    Empleado.getAllUsers((err, empleados) => {
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
const obtenerEmpleadosPorId = (req, res) => {
    const { id } = req.params;
    Empleado.getUserById(id, (err, empleado) => {
        if (err) {
            console.error('Error retrieving employee by id:', err);
            return res.status(500).json({
                estatus: 'error',
                mensaje: 'Error al obtener el empleado de la base de datos'
            });
        }
        if (!empleado) {
            return res.status(404).json({
                estatus: 'conexion fallida',
                mensaje: 'Empleado no encontrado'
            });
        }
        res.status(200).json({
            estatus: 'conexion exitosa',
            datos: {
                empleado: empleado
            }
        });
    });
};

// Agregar un nuevo empleado
const agregarEmpleado = (req, res) => {
    const nuevoEmpleado = req.body;
    Empleado.createUser(nuevoEmpleado, (err, result) => {
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
                empleado: nuevoEmpleado
            }
        });
    });
};

// Eliminar un empleado por su id
const borrarEmpleado = (req, res) => {
    const { id } = req.params;
    Empleado.deleteUser(id, (err, result) => {
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
const actualizarEmpleado = (req, res) => {
    const { id } = req.params;
    const updatedEmpleado = req.body;
    Empleado.updateUser(id, updatedEmpleado, (err, result) => {
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
                empleado: updatedEmpleado
            }
        });
    });
};

module.exports = {
    obtenerEmpleados,
    obtenerEmpleadosPorId,
    agregarEmpleado,
    borrarEmpleado,
    actualizarEmpleado
};
