router.post('/editarReporte', (req, res) => {
    const {mascota, correo, estado } = req.body;
    console.log('Correo recibido en POST:', correo); // Verificar que se recibe correctamente
    const fecha = new Date();

    mascota1.getUserById(mascota, (err, mascotaInfo) => { // Cambia nombreMascota por mascotaInfo
        if (err) {
            console.error('Error al obtener el nombre de la mascota:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        const nombreMascota = mascotaInfo.nombre; // Obtener el nombre de la mascota del objeto mascotaInfo

        const newReport = {
            estado: estado,
            fecha,
            id_mascota: mascota,
            nombre_mascota: nombreMascota,
            correo, // Agregamos el nombre de la mascota al reporte
        };
        dbMaltratos.createUser(1,newReport, (err, result) => {
            if (err) {
                console.error('Error al insertar reporte de pérdida:', err);
                res.status(500).send('Error interno del servidor');
                return;
            }
            res.redirect('/inicio_usuario');
        });
    });


  
});