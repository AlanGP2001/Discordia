
const express = require('express');
const { db } = require('../../utilerias/firebase');
const router = express.Router();

router.get('/', async (req, res) => {
   try {
      console.log('Esto es de calis');
      res.send('Hola esto es de Calis');
   } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
   }
});

router.post('/testeo', async (req, res) => {
   console.log(req.body);
   const newTest = {
      email: req.body.email,
      name: req.body.name
   }
   db.ref('test').push(newTest)
   res.send('received');
});

router.get('/consulta', async (req, res) => {
   db.ref('test').once('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data);
   });
   res.send('consultado');
});

module.exports = router;
