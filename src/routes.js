const express = require('express');

const equiposRoutes = require('./equipo/routes');
const partidosRoutes = require('./partido/routes');
const apuestasRoutes = require('./apuesta/routes');
const router = express.Router();

router.use('/equipos', equiposRoutes);
router.use('/partidos', partidosRoutes );
router.use('/apuestas', apuestasRoutes);

router.use('*', (req, res) => {
    const rutaSolicitada = req.path;
    console.log(req)
    res.status(404).json({
        error: 'Ruta no encontrada',
        message: `La ruta ${rutaSolicitada} solicitada no existe o no está disponible temporalmente`,
    });
});


module.exports = router;