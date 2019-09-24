const { check } = require('express-validator');

module.exports = function(application) {
    application.post('/chat', [
        check('apelido', 'Apelido é obrigatório').not().isEmpty(),
        check('apelido', 'Apelido deve ser > 4 e < 15 caracteres').isLength({min : 4, max : 15}),
    ], function(req, res) {
        application.app.controllers.chat.iniciaChat(application, req, res);
    });
}