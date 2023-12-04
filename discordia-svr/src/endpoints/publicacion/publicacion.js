const express = require('express');
const { db } = require('../../utilerias/firebase');
const { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query , where } = require("firebase/firestore");
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
    try {
        const newPublication = {
            titulo: req.body.titulo,
            contenido: req.body.contenido,
            tipo: req.body.tipo,
            autor: req.body.autor,
            like: 0,
        };

        const publicacionCollectionRef = collection(db, 'publicaciones');
        const docRef = await addDoc(publicacionCollectionRef, newPublication);

        console.log(`Publicacion creado con éxito ${docRef.id}`);
        res.send('OK');
    } catch (error) {
        console.error('Error al agregar la publicación:', error);
        res.status(500).send('Error interno del servidor al agregar la publicación');
    }
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

        console.log('Publicacion actualizada correctamente');
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

router.post('/countPublicaciones', async (req, res) => {
    try {
        // Obtiene el userId del cuerpo de la solicitud
        const userId = req.body.userId;

        // Verifica si se proporcionó un userId
        if (!userId) {
            return res.status(400).json({ error: 'Se requiere un userId en el cuerpo de la solicitud.' });
        }

        // Obtiene la referencia a la colección de publicaciones
        const publicacionCollectionRef = collection(db, 'publicaciones');

        // Crea una consulta que filtra por el ID del usuario
        const q = query(publicacionCollectionRef, where('autor', '==', userId));

        // Obtiene documentos que cumplen con la condición de la consulta
        const querySnapshot = await getDocs(q);

        // Cuenta la cantidad de documentos obtenidos (que son las publicaciones del usuario)
        const count = querySnapshot.size;

        // Envía la respuesta con el conteo
        res.json({ count });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el conteo de publicaciones');
    }
});



module.exports = router;
