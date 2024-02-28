const pool = require('../config');

async function getApuestas(req, res) {
    try {
        const response = await pool.query('SELECT * FROM Apuestas');
        res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

async function addApuesta(req, res) {
    try {
        const { idPartido, nombre, email, apuesta, factorApuesta, cantidadApostada } = req.body;
        const moment = require('moment-timezone');
        const chileTimeZone = 'America/Santiago';
        const fecha = moment.tz(new Date(), chileTimeZone).format('YYYY-MM-DD HH:mm:ss');
        const result = await pool.query("INSERT INTO Apuestas " +
        "(idpartido, nombreapostador, emailapostador, fechaapuesta, " +
        "apuesta, factorapuesta, cantidadapostada) " +
        "VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", 
        [idPartido, nombre, email, fecha,
            apuesta, factorApuesta, cantidadApostada]);
        res.send(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { addApuesta, getApuestas };