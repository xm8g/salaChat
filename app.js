var app = require('./config/server');

var server = app.listen(3000, function(){
    console.log("Servidor ON");
});

var io = require('socket.io').listen(server);

app.set('io', io); //define como variavel global

/* criar conexão por websocket */
io.on('connection', function(socket) {
    console.log('Usuario conectou');

    socket.on('disconnect', function() {
        console.log('Usuario saiu');
    });
    socket.on('msgParaServidor', function(data) {
        /* dialogo */
        socket.emit('msgParaCliente', {
            apelido: data.apelido,
            mensagem: data.mensagem
        });
        socket.broadcast.emit('msgParaCliente', {
            apelido: data.apelido,
            mensagem: data.mensagem
        });
        /* participantes */
        if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {
            socket.emit('participanteParaCliente', {
                apelido: data.apelido
            });
            socket.broadcast.emit('participanteParaCliente', {
                apelido: data.apelido
            });
        }
    });
});
