const pool = require('../config');

async function getEquipos(req, res) {
    try {
        const response = await pool.query('Select id, nombreEquipo, liga from Equipos order by id');
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getEquipoById(req, res) {
    try {
        const id = req.params.id;
        const response = await pool.query('SELECT id, nombreEquipo, division FROM Equipos WHERE id = $1', [id]);
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function addEquipo(req, res) {
    try {
        const { nombreEquipo, division } = req.body;
        const datosImagen = req.file.buffer;
        const result = await pool.query('INSERT INTO Equipos (nombreEquipo, division, logo) VALUES ($1, $2, $3) RETURNING *', 
        [nombreEquipo, division, datosImagen]);
        res.send(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getLogoEquipo(req, res ){
    const imagenId = req.params.id;
    console.log("Si corre aqui: "+ imagenId);
    try {
        const result = await pool.query('SELECT logo FROM Equipos WHERE id = $1', [imagenId]);
        console.log("Si corre aqui: ");
        if (result.rows[0] != null) {
            const imagen = result.rows[0];
            res.writeHead(200, {
                'Content-Type': 'image/png' , // Ajusta el tipo de contenido según el formato de tus imágenes
                'Content-Length': imagen.logo.length,
            });
            res.end(imagen.logo);
        } else {
            console.log("No funciona");
            res.status(404).send('Imagen no encontrada');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener la imagen');
    }
}

async function deleteEquipo(req, res) {
    try {
        const id = req.params.id;
        await pool.query('DELETE FROM Equipos WHERE id = $1', [id]);
        res.status(200).json(`Equipo ${id} eliminado`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getEquipos, getEquipoById, addEquipo, deleteEquipo, getLogoEquipo };