const express = require('express');
const { db } = require('../../utilerias/firebase');
const { collection, doc, addDoc, serverTimestamp, getDocs } = require("firebase/firestore");
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const chatId = req.body.chatId;
    const mensaje = {
      sender: req.body.sender,
      text: req.body.text,
      timestamp: serverTimestamp()
    };

    // Obtener una referencia al documento "chatId" en la colección "chats"
    const chatDocRef = doc(db, 'chats', chatId);

    // Agregar el mensaje a la subcolección "messages" del chat
    const mensajeRef = await addDoc(collection(chatDocRef, 'messages'), mensaje);

    console.log(`Mensaje enviado con éxito. ID del mensaje: ${mensajeRef.id}`);
    res.send('Mensaje enviado exitosamente');
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
    throw new Error('No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.');
    // Puedes personalizar el mensaje de error según tus necesidades.
  }
});

router.get('/:chatId/mensajes', async (req, res) => {
  try {
    const chatId = req.params.chatId;

    // Obtener una referencia al documento "chatId" en la colección "chats"
    const chatDocRef = doc(db, 'chats', chatId);

    // Obtener todos los mensajes de la subcolección "messages" del chat
    const mensajesSnapshot = await getDocs(collection(chatDocRef, 'messages'));

    const mensajes = mensajesSnapshot.docs.map(doc => doc.data());

    res.json({ mensajes });
  } catch (error) {
    console.error('Error al obtener mensajes del chat:', error);
    res.status(500).send('Error al obtener mensajes del chat. Inténtalo de nuevo más tarde.');
  }
});

router.post('/:chatId/mensaje', async (req, res) => {
  try {
    const { chatId, userId, texto } = req.body;

    // Verificar si el usuario está asociado al chat
    const chatDocRef = doc(db, 'chats', chatId);
    const chatDocSnapshot = await getDocs(chatDocRef);

    if (!chatDocSnapshot.exists()) {
      return res.status(404).send('Chat no encontrado');
    }

    const chatData = chatDocSnapshot.data();
    if (!chatData.usuarios.includes(userId)) {
      return res.status(403).send('Usuario no autorizado para enviar mensajes en este chat');
    }

    // Agregar el mensaje a la subcolección "messages" del chat
    const mensaje = {
      sender: userId,
      text: texto,
      timestamp: serverTimestamp(),
    };

    const mensajesCollectionRef = collection(db, 'chats', chatId, 'messages');
    await addDoc(mensajesCollectionRef, mensaje);

    console.log('Mensaje enviado con éxito.');
    res.send('Mensaje enviado exitosamente');
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
    res.status(500).send('No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.');
  }
});

router.post('/nuevo-chat', async (req, res) => {
  try {
    const { usuario1, usuario2 } = req.body;

    // Crear un nuevo chat con información inicial
    const nuevoChat = {
      usuarios: [usuario1, usuario2], // Array de IDs de los dos usuarios
    };

    // Agregar el nuevo chat a la colección "chats"
    const nuevoChatRef = await addDoc(collection(db, 'chats'), nuevoChat);

    console.log(`Nuevo chat creado con éxito. ID del chat: ${nuevoChatRef.id}`);
    res.send('Nuevo chat creado exitosamente');
  } catch (error) {
    console.error('Error al crear el nuevo chat:', error);
    res.status(500).send('Error al crear el nuevo chat. Inténtalo de nuevo más tarde.');
  }
});

module.exports = router;