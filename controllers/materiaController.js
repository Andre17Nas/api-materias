'use strict'

const firebase = require('../db')
const Materia = require('../models/materia')
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


const getAllMaterias = async (req, res, next) =>{
    try{
        const materias = await firestore.collection('materia');
        const data = await materias.get();
        const materiaArray = [];
        if(data.empty){
            res.status(404).send('Ainda não há publicações')
        }else{
            data.forEach(doc =>{
                const materia = new Materia(
                    doc.id,
                    doc.data().title,
                    doc.data().description,
                    doc.data().image,
                    doc.data().published
                );
                materiaArray.push(materia);
            })
            res.send(materiaArray)
        }
    }catch(err){
        res.status(400).send(err.message);
    }
}

const getMateria = async (req, res, next) =>{
    try{
        const id = req.params.id;
        const materia = await firestore.collection('materia').doc(id);
        const data = await materia.get();
        if(!data.exists){
            res.status(404).send('A Materia não foi encontrada!')
        }else{
            res.send(data.data());
        }
    }catch(err){
        res.status(400).send(err.message)
    }
}

module.exports= {
    addMateria,
    getAllMaterias,
    getMateria
}