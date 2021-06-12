const express = require('express');
const {addMateria, getAllMaterias, getMateria} = require('../controllers/materiaController');

const router = express.Router();

router.post('/materia', addMateria);
router.get('/materias', getAllMaterias);
router.get('/materia/:id', getMateria);

module.exports = {
    routes: router
}