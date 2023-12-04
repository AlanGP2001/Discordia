const { validarToken } = require('../utilerias/token');
module.exports = function (app) {
    app.use('/test', require('./test_conection/test'));
    app.use(validarToken);
    app.use('/publicacion', require('./publicacion/publicacion'));
    app.use('/comunidad', require('./comunidad/comunidad'));
    app.use('/chat', require('./chat/chat'));
}