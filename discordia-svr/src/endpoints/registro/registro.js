const express = require('express');
const { db } = require('../../utilerias/firebase');
const router = express.Router();

router.get('/', async (req, res) => {
    const newTest = {
        gamertag: req.body.email,
        email: req.body.name,
        contracena: req.body.contracena,
    }
    db.ref('test').push(newTest)
    res.send('received');
});

module.exports = router;
