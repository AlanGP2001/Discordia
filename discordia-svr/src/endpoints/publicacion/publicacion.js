const express = require('express');
const { db } = require('../../utilerias/firebase');
const { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } = require("firebase/firestore");
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const publicacionCollectionRef = collection(db, 'publicaciones');
        const querySnapshot = await getDocs(publicacionCollectionRef);

        const data = querySnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });

        console.log('Publicaciones Consultados');
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
    }
});

router.post('/agregarPublicacion', async (req, res) => {
    const newPublication = {
        titulo: req.body.titulo,
        contenido: req.body.contenido,
        tipo: req.body.tipo,
        autor: req.body.autor,
        like: req.body.like,
        // imgUrl: req.body.imgUrl,
        // idUser: req.body.idUser,
    };

    const publicacionCollectionRef = collection(db, 'publicaciones');
    const docRef = await addDoc(publicacionCollectionRef, newPublication);
    res.send(`Publicacion creado con exito ${docRef.id}`)
});

router.put('/editar/:id', async (req, res) => {
    try {
        const publicacionCollectionRef = collection(db, 'publicaciones');
        const docRef = doc(publicacionCollectionRef, req.params.id);

        // Datos a editar
        const updatedData = {
            titulo: req.body.titulo,
            contenido: req.body.contenido,
            tipo: req.body.tipo,
            // autor: req.body.autor,
            imgUrl: req.body.imgUrl,
            like: req.body.like,
        };

        await updateDoc(docRef, updatedData);

        res.send('Publicacion actualizada correctamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error actualizando la publicacion');
    }
});

router.delete('/eliminar/:id', async (req, res) => {
    try {
       const publicacionCollectionRef = collection(db, 'publicaciones');
       const docRef = doc(publicacionCollectionRef, req.params.id);
 
       await deleteDoc(docRef);
 
       res.send('Publicacion eliminada correctamente');
    } catch (error) {
       console.error(error);
       res.status(500).send('Error eliminando la publicacion');
    }
 });

module.exports = router;
