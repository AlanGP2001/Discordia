// const { validarToken } = require('../utilerias/token');
module.exports = function (app) {
    app.use('/test', require('./test_conection/test'))
    app.use('/login', require('./login/login'))
    app.use('/registro', require('./registro/registro'))
}