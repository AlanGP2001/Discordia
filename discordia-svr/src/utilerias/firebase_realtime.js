const admin = require('firebase-admin');
const firebaseConfig = require('./discordia-343121.json');

admin.initializeApp({
    databaseURL: 'https://discordia-db-default-rtdb.firebaseio.com/',
    credential: admin.credential.cert(firebaseConfig),
});

const db_realtime = admin.database();

module.exports = {
    db_realtime,
};
