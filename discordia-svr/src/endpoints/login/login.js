const express = require('express');
const { db } = require('../../utilerias/firebase');
const { generarTokenSesion } = require('../../utilerias/token');
const router = express.Router();

router.post('/', async (req, res) => {
    const usuarioId = '/test/-NjBGo_7xEWre_Ltk5-8';
    // db.ref('usuario').once('value', (snapshot) => {
    //     const data = snapshot.val();
    //     console.log(data);
    //  });
     const token = generarTokenSesion(usuarioId)
     console.log(`Token ${token}`);
     res.send(`Usuarios Consultados ${token}`);
});

module.exports = router;
