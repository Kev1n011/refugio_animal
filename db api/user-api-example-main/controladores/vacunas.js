const Vacuna = require('../models/vacunas.js');

// Obtener todos los empleados
const obtenerVacunas = (req, res) => {
    Vacuna.getAllUsers((err, vacunas) => {
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
                vacunas: vacunas
            }
        });
    });
};

// Obtener un empleado por su id
const obtenerVacunasPorId = (req, res) => {
    const { id } = req.params;
    Vacuna.getUserById(id, (err, vacuna) => {
        if (err) {
            console.error('Error retrieving employee by id:', err);
            return res.status(500).json({
                estatus: 'error',
                mensaje: 'Error al obtener el empleado de la base de datos'
            });
        }
        if (!vacuna) {
            return res.status(404).json({
                estatus: 'conexion fallida',
                mensaje: 'Empleado no encontrado'
            });
        }
        res.status(200).json({
            estatus: 'conexion exitosa',
            datos: {
                vacuna: vacuna
            }
        });
    });
};

// Agregar un nuevo empleado
const agregarVacuna = (req, res) => {
    const nuevaVacuna = req.body;
    Vacuna.createUser(nuevaVacuna, (err, result) => {
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
                vacuna: nuevaVacuna
            }
        });
    });
};

// Eliminar un empleado por su id
const borrarVacuna = (req, res) => {
    const { id } = req.params;
    Vacuna.deleteUser(id, (err, result) => {
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
const actualizarVacuna = (req, res) => {
    const { id } = req.params;
    const vacunaActualizada = req.body;
    Vacuna.updateUser(id, vacunaActualizada, (err, result) => {
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
                vacuna: vacunaActualizada
            }
        });
    });
};

module.exports = {
    obtenerVacunas,
    obtenerVacunasPorId,
    agregarVacuna,
    borrarVacuna,
    actualizarVacuna
};
