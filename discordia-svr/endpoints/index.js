const { validarToken } = require('../utilerias/token');
module.exports = function (app) {
    app.use('/test', require('./test_conection/test'))
}