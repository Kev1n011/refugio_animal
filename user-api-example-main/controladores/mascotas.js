const Mascota = require('../models/mascotas.js');

// Obtener todos los empleados
const obtenerMascota = (req, res) => {
    Mascota.getAllUsers((err, mascotas) => {
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
                mascotas: mascotas
            }
        });
    });
};

// Obtener un empleado por su id
const obtenerMascotasPorId = (req, res) => {
    const { id } = req.params;
    Mascota.getUserById(id, (err, mascota) => {
        if (err) {
            console.error('Error retrieving employee by id:', err);
            return res.status(500).json({
                estatus: 'error',
                mensaje: 'Error al obtener el empleado de la base de datos'
            });
        }
        if (!mascota) {
            return res.status(404).json({
                estatus: 'conexion fallida',
                mensaje: 'Empleado no encontrado'
            });
        }
        res.status(200).json({
            estatus: 'conexion exitosa',
            datos: {
                mascota: mascota
            }
        });
    });
};

// Agregar un nuevo empleado
const agregarMascota = (req, res) => {
    const nuevaMascota = req.body;
    Mascota.createUser(nuevaMascota, (err, result) => {
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
                mascota: nuevaMascota
            }
        });
    });
};

// Eliminar un empleado por su id
const borrarMascota = (req, res) => {
    const { id } = req.params;
    Mascota.deleteUser(id, (err, result) => {
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
const actualizarMascota = (req, res) => {
    const { id } = req.params;
    const MascotaActualizado = req.body;
    Mascota.updateUser(id, MascotaActualizado, (err, result) => {
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
                mascota: MascotaActualizado
            }
        });
    });
};

module.exports = {
    obtenerMascota,
    obtenerMascotasPorId,
    agregarMascota,
    borrarMascota,
    actualizarMascota
};
