const pool = require('../config');

async function getPartidos(req, res) {
    try {
        const response = await pool.query('SELECT * FROM Partidos');
        const partidos = await Promise.all(response.rows.map(async (partido) => {
            const equipoLocal = await pool.query('SELECT nombreEquipo FROM Equipos WHERE id = $1', [partido.idequipolocal]);
            const equipoVisitante = await pool.query('SELECT nombreEquipo FROM Equipos WHERE id = $1', [partido.idequipovisitante]);
            const nuevoPartido = {
                id: partido.id,
                fecha: partido.fechapartido,
                hora: partido.horapartido,
                division: partido.division,
                factorLocal: partido.factorlocal,
                factorVisitante: partido.factorvisita,
                factorEmpate: partido.factorempate,
                estado: partido.estadopartido,
                equipoLocal: equipoLocal.rows[0].nombreequipo,
                equipoVisitante: equipoVisitante.rows[0].nombreequipo
            };
            console.log(nuevoPartido);
            return nuevoPartido;
        }));
        res.status(200).json(partidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getPartidoApuesta(req, res) {
    try {
        const idPartido = req.params.id;
        console.log(idPartido);
        const response = await pool.query('SELECT * FROM Partidos WHERE id = $1', [idPartido]);
        if(response.rows[0] == null){
            res.json({ error: 'Partido no encontrado' });
            return;
        }
        const equipoLocal = await pool.query('SELECT nombreEquipo, liga FROM Equipos WHERE id = $1', [response.rows[0].idequipolocal]);
        const equipoVisitante = await pool.query('SELECT nombreEquipo, liga FROM Equipos WHERE id = $1', [response.rows[0].idequipovisitante]);

        const nuevoPartido = {
            id: response.rows[0].id,
            fecha: response.rows[0].fechapartido,
            hora: response.rows[0].horapartido,
            equipoLocal: {
                id: response.rows[0].idequipolocal,
                nombre: equipoLocal.rows[0].nombreequipo,
                liga: equipoLocal.rows[0].liga
            },
            equipoVisitante: {
                id: response.rows[0].idequipovisitante,
                nombre: equipoVisitante.rows[0].nombreequipo,
                liga: equipoVisitante.rows[0].liga
            },
            factorLocal: response.rows[0].factorlocal,
            factorVisitante: response.rows[0].factorvisita,
            factorEmpate: response.rows[0].factorempate,
        }
        res.status(200).json(nuevoPartido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getPartidoApuesta,getPartidos };