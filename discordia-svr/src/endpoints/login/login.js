const express = require('express');
const { db } = require('../../utilerias/firebase');
const router = express.Router();

router.get('/', async (req, res) => {
    db.ref('usuario').once('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
     });
     res.send('Usuarios Consultados');
});

module.exports = router;
