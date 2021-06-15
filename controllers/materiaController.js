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

        let {page, limit= 2 } = req.query;

        if(!page){
            page = 1;
        }

        /* Para paginar a api de n em n materias preciso ter a referencia do ultimo item entao: 
        let last = data.docs[snapshot.docs.length - 1];
        let first = data.docs[snapshot.docs[0]]

        startAt(A) = [ A - Z]
        startAfter(A) = [B - Z]
        endAt(J) = [A - J]
        endBefore(J) = [A - I]
        
        //next page
        const nextt = firestore.collection('materia').startAfter(last.data()).limit(3);
        //back page
        const prev = firestore.collection('materia').endBefore(first.data()).limit(3);
        
        */
        

        const materias = await firestore.collection('materia');
        const data = await materias.get();

        const position = data.docs[page * 1];

        const materiaArray = [];

        if(data.empty){
            res.status(404).send('Ainda não há publicações')
        }else{
            data.forEach(doc =>{
                const materia = {  
                    id: doc.id,
                    title: doc.data().title,
                    description: doc.data().description,
                    image: doc.data().image,
                    published: doc.data().published
                };
                materiaArray.push(materia);
            })
            res.send(materiaArray);
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