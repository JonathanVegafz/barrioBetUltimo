const express = require('express');

// const middlewares = require('../middlewares');
const partidoController = require('./controllers');

const partidoRoutes = express.Router();

partidoRoutes.get('', partidoController.getPartidos);
partidoRoutes.get('/apuesta/:id', partidoController.getPartidoApuesta);

// docRoutes.post('/documento', middlewares.authGuard, docControllers.addDocs);

module.exports = partidoRoutes;
