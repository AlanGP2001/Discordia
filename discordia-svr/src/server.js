const express = require("express");
const helmet = require('helmet');
const cors = require('cors');
const http = require('http');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const { config } = require('./utilerias/config');
const functions = require('firebase-functions');

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

const puerto = config.PUERTO;
const mensajeArranque = `${new Date()}🚀 Servidor Discordia iniciado | Puerto: ${puerto}`;

let server;
let tipoConexion = '';

try {
  if (config.RUTA_KEY && config.RUTA_CERT) {
    tipoConexion = 'https';
    server = https.createServer({
      key: fs.readFileSync(config.RUTA_KEY),
      cert: fs.readFileSync(config.RUTA_CERT),
    }, app);
  } else {
    tipoConexion = 'http';
    server = http.createServer(app);
  }
} catch (error) {
  console.error('Error al crear el servidor:', error);
  tipoConexion = 'http';
  server = http.createServer(app);
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

exports.api = functions.https.onRequest(app)
