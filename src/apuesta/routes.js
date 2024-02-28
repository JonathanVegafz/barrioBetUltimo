const express = require('express');

// const middlewares = require('../middlewares');
const apuestaController = require('./controllers');

const apuestaRoutes = express.Router();

apuestaRoutes.post('/addApuesta', apuestaController.addApuesta);
apuestaRoutes.get('', apuestaController.getApuestas);

// docRoutes.post('/documento', middlewares.authGuard, docControllers.addDocs);

module.exports = apuestaRoutes;