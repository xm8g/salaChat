const { validationResult } = require('express-validator');

module.exports.iniciaChat = function(application, req, res) {

    var dadosForm = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.render('index', {validacao: errors.array()});
        return;
        
    }
    application.get('io').emit('msgParaCliente', {
        apelido: dadosForm.apelido, 
        mensagem: ' acabou de entrar.'
    });

    res.render('chat', {dadosForm : dadosForm});
}
