const express = require('express');

// const middlewares = require('../middlewares');
const equiposController = require('./controllers');

const equiposRoutes = express.Router();

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

equiposRoutes.get('', equiposController.getEquipos);
equiposRoutes.get('/:id/logo', equiposController.getLogoEquipo);
// equiposRoutes.get('/:id', equiposController.getEquipoById);
// equiposRoutes.post('/add',upload.single('imagen'), equiposController.addEquipo);
// equiposRoutes.delete('/:id/delete', equiposController.deleteEquipo);
// docRoutes.post('/documento', middlewares.authGuard, docControllers.addDocs);

module.exports = equiposRoutes;