const Reporte = require('../models/reporteMaltratos.js');

// Obtener todos los empleados
const obtenerReportes = (req, res) => {
    Reporte.getAllUsers((err, reportes) => {
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
                reportes: reportes
            }
        });
    });
};

// Obtener un empleado por su id
const obtenerReportesPorId = (req, res) => {
    const { id } = req.params;
    Reporte.getUserById(id, (err, reporte) => {
        if (err) {
            console.error('Error retrieving employee by id:', err);
            return res.status(500).json({
                estatus: 'error',
                mensaje: 'Error al obtener el empleado de la base de datos'
            });
        }
        if (!reporte) {
            return res.status(404).json({
                estatus: 'conexion fallida',
                mensaje: 'Empleado no encontrado'
            });
        }
        res.status(200).json({
            estatus: 'conexion exitosa',
            datos: {
                reporte: reporte
            }
        });
    });
};

// Agregar un nuevo empleado
const agregarReporte = (req, res) => {
    const nuevoReporte = req.body;
    Reporte.createUser(nuevoReporte, (err, result) => {
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
                reporte: nuevoReporte
            }
        });
    });
};

// Eliminar un empleado por su id
const borrarReporte = (req, res) => {
    const { id } = req.params;
    Reporte.deleteUser(id, (err, result) => {
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
const actualizarReporte = (req, res) => {
    const { id } = req.params;
    const reporteActualizado = req.body;
    Reporte.updateUser(id, reporteActualizado, (err, result) => {
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
                reporte: reporteActualizado
            }
        });
    });
};

module.exports = {
    obtenerReportes,
    obtenerReportesPorId,
    agregarReporte,
    borrarReporte,
    actualizarReporte
};
