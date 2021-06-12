'use strict'

const firebase = require('../db')
const materia = require('../models/materia')
const firestore = firebase.firestore()

const addMateria = async(req, res, next) =>{
    try{
        const data = req.body;
        await firestore.collection('materia').doc().set(data);
        res.send('Dados Salvos com Sucesso! :)')
    }catch(err){
        res.status(400).send(err.message); 
    }
}

module.exports= {
    addMateria
}