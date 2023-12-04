const express = require('express');
const { db } = require('../../utilerias/firebase');
const { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } = require("firebase/firestore");
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const comunidadCollectionRef = collection(db, 'comunidades');
        const querySnapshot = await getDocs(comunidadCollectionRef);

        const data = querySnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });

        console.log('Comunidades Consultados');
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
    }
});

router.post('/agregarComunidad', async (req, res) => {
    try {
        const newComunidad = {
            user: req.body.user,
            detalle: '',
            followers: 0,
        };

        const comunidadCollectionRef = collection(db, 'comunidades');
        const docRef = await addDoc(comunidadCollectionRef, newComunidad);

        console.log(`Comunidades creado con éxito ${docRef.id}`);
        res.send('OK');
    } catch (error) {
        console.error('Error al agregar la comunidad:', error);
        res.status(500).send('Error interno del servidor al agregar un comunidad');
    }
});

router.put('/editar/:id', async (req, res) => {
    try {
        const comuncomunidadCollectionRefidad = collection(db, 'comunidades');
        const docRef = doc(comuncomunidadCollectionRefidad, req.params.id);

        const updatedData = {
            detalle: req.body.detalle,
        };

        await updateDoc(docRef, updatedData);

        console.log('Comunidad actualizada correctamente');
        res.send('Comunidad actualizada correctamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error actualizando la comunidad');
    }
});

module.exports = router;