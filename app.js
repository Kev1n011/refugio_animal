const path = require('path');
const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const db = require('./models/empleados');
const bcrypt = require('bcrypt');
const saltRounds = 10; 


require('dotenv').config();

// Importar rutas
const clientesRouter = require('./routes/clientes');
const empleadosRouter = require('./routes/empleados');
const mascotasRouter = require('./routes/mascotas');
const vacunasRouter = require('./routes/vacunas');
const adopcionRouter = require('./routes/adopcion');
const servicioCastracionRouter = require('./routes/servicioCastracion');
const reportePerdidasRouter = require('./routes/reportePerdidas');
const reporteMaltratosRouter = require('./routes/reporteMaltratos');
const loginRouter = require('./viewsJS/login');
const registroRouter = require('./viewsJS//registro');
const reportesRouter = require('./viewsJS/reportes');
const registrarMascota = require('./viewsJS/mascota');
const registrarAdopcion = require('./viewsJS/realizar_adopcion');
const registrarVacuna = require('./viewsJS/realizar_vacuna');
const registrarCastracion = require('./viewsJS/realizar_castracion');

const misReportesUsuario = require('./viewsJS/mis_reportes_usuario');



// Insertar empleados al iniciar la aplicación si no existen
function insertarEmpleadosIniciales() {
    db.getAllUsers((err, users) => {
        if (err) throw err;
        if (users.length === 0) {
            const empleados = [
                {
                    nombre: 'María López',
                    fechaNacimiento: '1990-05-15',
                    ciudad: 'Ciudad de México',
                    colonia: 'Centro',
                    cp: '12345',
                    sueldo: '$2500',
                    telefono: '5551234567',
                    correoElectronico: 'empleado1@gmail.com',
                    contrasena: bcrypt.hashSync('123', saltRounds)
                },
                {
                    nombre: 'Juan Pérez',
                    fechaNacimiento: '1985-09-20',
                    ciudad: 'Guadalajara',
                    colonia: 'Zona Norte',
                    cp: '54321',
                    sueldo: '$3000',
                    telefono: '5559876543',
                    correoElectronico: 'empleado2@gmail.com',
                    contrasena: bcrypt.hashSync('123', saltRounds)
                }
            ];

            empleados.forEach((empleado) => {
                db.createUser(empleado, (err, result) => {
                    if (err) throw err;
                    console.log('Empleado insertado:', empleado.nombre);
                });
            });
        }
    });
}




const app = express();
    

app.use(express.json());

app.use('/diseno', express.static(path.join(__dirname, 'diseno')));



app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key', // Usa una cadena secreta más segura en producción
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Asegúrate de configurar 'secure: true' si usas HTTPS
}));

// app.useloginregister
// Rutas
app.use('/api/v1/clientes', clientesRouter);
app.use('/api/v1/empleados', empleadosRouter);
app.use('/api/v1/mascotas', mascotasRouter);
app.use('/api/v1/vacunas', vacunasRouter);
app.use('/api/v1/adopcion', adopcionRouter);
app.use('/api/v1/servicioCastracion', servicioCastracionRouter);
app.use('/api/v1/reportePerdidas', reportePerdidasRouter);
app.use('/api/v1/reporteMaltratos', reporteMaltratosRouter);


// Ruta para servir el formulario de login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'registro.html'));
});
app.get('/reportes', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'reportes.html'));
});
app.get('/reportes', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'reportes.css'));
});
app.get('/registrar_mascota', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'registrar_mascota.html'));
});

app.get('/registrarMascotaPrueba', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'registrarMascotaPrueba.html'));
});

app.get('/registrar_adopcion', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'registrar_adopcion.html'));
});

app.get('/registrar_vacuna', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'registrar_vacuna.html'));
});

app.get('/registrar_castracion', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'registrar_castracion.html'));
});

app.get('/mis_reportes_usuario', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'mis_reportes_usuario.html'));
});

app.get('/reportes_empleado', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'reportes_empleado.html'));
});

app.get('/registro_empleado', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'registro_empleado.html'));
});

// Middleware para proteger rutas
function ensureAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    } else {
        res.redirect('/');
    }
}

// Ruta protegida
app.get('/inicio_usuario', ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'inicio_usuario.html'));
});

app.get('/inicio_empleado', ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'inicio_empleado.html'));
});





// Ruta para cerrar sesión
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/inicio_usuario');
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});

app.use(express.static(path.join(__dirname, 'public')));

// Usar el enrutador de login
app.use(loginRouter);
app.use(registroRouter);
app.use(reportesRouter);
app.use(registrarMascota);
app.use(registrarAdopcion);
app.use(registrarVacuna);
app.use(registrarCastracion);


// Iniciar el servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    insertarEmpleadosIniciales();

});
