const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const mascota = require('../models/mascotas');

const router = express.Router();

// Configurar body-parser y multer
router.use(bodyParser.urlencoded({ extended: true }));
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/imagenes/')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // Agrega timestamp al nombre del archivo para evitar duplicados
  }
});
const upload = multer({ storage: storage });

const fs = require('fs');
const dir = './public/imagenes';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

router.post('/registrar_mascota', upload.single('imagen'), (req, res) => {
  const { nombre, tipo, raza, edad, sexo, color, peso } = req.body;
  const imagenRuta = req.file ? 'imagenes/' + req.file.filename : ''; // Cambio aquí para hacer la ruta relativa a public

  const nuevaMascota = {
      nombre: nombre,
      tipo: tipo,
      raza: raza,
      edad: edad,
      sexo: sexo,
      color: color,
      peso: peso,
      imagen_mascota: imagenRuta
  };

  mascota.createUser(nuevaMascota, (err, result) => {
      if (err) {
          console.error('Error al registrar la mascota:', err);
          res.status(500).send('Error interno del servidor');
          return;
      }
      res.json({ id: result.insertId, imagen_mascota: imagenRuta });
  });
});
module.exports = router;

router.post('/registrar_mascota1', upload.single('imagen'), (req, res) => {
  const { nombre, tipo, raza, edad, sexo, color, peso } = req.body;
  const imagenRuta = req.file ? 'imagenes/' + req.file.filename : ''; // Cambio aquí para hacer la ruta relativa a public

  const nuevaMascota = {
      nombre: nombre,
      tipo: tipo,
      raza: raza,
      edad: edad,
      sexo: sexo,
      color: color,
      peso: peso,
      imagen_mascota: imagenRuta
  };

  mascota.createUser(nuevaMascota, (err, result) => {
      if (err) {
          console.error('Error al registrar la mascota:', err);
          res.status(500).send('Error interno del servidor');
          return;
      }
      // Asegúrate de enviar una respuesta en caso de éxito
      res.json({ id: result.insertId, imagen_mascota: imagenRuta });
  });
});
module.exports = router;