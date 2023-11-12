
const express = require('express');
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

module.exports = router;
