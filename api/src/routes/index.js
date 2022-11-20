const { Router } = require('express');

const { showVideogamesGenres } = require('../controllers/genres');
const {showVideogameByName, createVideogame, showVideogameById} = require('../controllers/videogames')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/videogames', showVideogameByName);
router.get('/genres', showVideogamesGenres);
router.get('/videogames/:id', showVideogameById)
router.post('/videogame', createVideogame)



module.exports = router;
