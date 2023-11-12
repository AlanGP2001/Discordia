const express = require("express");
const helmet = require('helmet');
const cors = require('cors');
const http = require('http');
const https = require('https');
const fs = require('fs');
const { config } = require('./config');
// const admin = require('firebase-admin');
// const firebase = require('./utilerias/discordia-343121.json');

const app = express();

app.use(helmet());
app.use(cors());

// admin.initializeApp({
// 	databaseURL: firebase.client_x509_cert_url,
// 	credential: admin.credential.cert({
// 		projectId: firebase.project_id,
// 		clientEmail: firebase.client_email,
// 		privateKey: firebase.private_key,
// 	}),
// });

const puerto = config.PUERTO;
const mensajeArranque = `${new Date()}🚀 Servidor Orion iniciado | Puerto: ${puerto}`;

let server;
let tipoConexion = '';
try {
	tipoConexion = 'https';
	server = https
		.createServer({
			key: fs.readFileSync(config.RUTA_KEY),
			cert: fs.readFileSync(config.RUTA_CERT),
		},
			app);
} catch (error) {
	tipoConexion = 'http';
	server = http
		.createServer(app);
}


server.listen(puerto);
server.on('listening', () => console.info(mensajeArranque + ` ${tipoConexion}`));

app.get('/', (req, res) => {
	res.send('🌎 Servidor Discordia');
});

/* Rutas */
require('./endpoints')(app);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Error interno del servidor.');
});

app.use((req, res, next) => {
    res.status(404).send('Petición no válida.');
});