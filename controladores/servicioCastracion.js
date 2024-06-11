const servicioCastracion = require('../models/servicioCastracion.js');

// Obtener todos los empleados
const obtenerServicio = (req, res) => {
    servicioCastracion.getAllUsers((err, servicios) => {
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
                servicios: servicios
            }
        });
    });
};

// Obtener un empleado por su id
const obtenerServicioPorId = (req, res) => {
    const { id } = req.params;
    servicioCastracion.getUserById(id, (err, servicio) => {
        if (err) {
            console.error('Error retrieving employee by id:', err);
            return res.status(500).json({
                estatus: 'error',
                mensaje: 'Error al obtener el empleado de la base de datos'
            });
        }
        if (!servicio) {
            return res.status(404).json({
                estatus: 'conexion fallida',
                mensaje: 'Empleado no encontrado'
            });
        }
        res.status(200).json({
            estatus: 'conexion exitosa',
            datos: {
                servicios: servicio
            }
        });
    });
};

// Agregar un nuevo empleado
const agregarServicio = (req, res) => {
    const nuevoServicio = req.body;
    servicioCastracion.createUser(nuevoServicio, (err, result) => {
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
                servicio: nuevoServicio
            }
        });
    });
};

// Eliminar un empleado por su id
const borrarServicio = (req, res) => {
    const { id } = req.params;
    servicioCastracion.deleteUser(id, (err, result) => {
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
const actualizarServicio = (req, res) => {
    const { id } = req.params;
    const servicioActualizado = req.body;
    servicioCastracion.updateUser(id, servicioActualizado, (err, result) => {
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
                servicio: servicioActualizado
            }
        });
    });
};

module.exports = {
    obtenerServicio,
    obtenerServicioPorId,
    agregarServicio,
    borrarServicio,
    actualizarServicio
};
