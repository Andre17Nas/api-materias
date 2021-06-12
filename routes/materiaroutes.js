const express = require('express');
const {addMateria} = require('../controllers/materiaController');

const router = express.Router();

router.post('/materia', addMateria);

module.exports = {
    routes: router
}