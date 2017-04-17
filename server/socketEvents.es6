import SocketIOServer from 'socket.io';

export default server => {
    var io = SocketIOServer.listen(server);

    io.on('connection', socket => {
        // Log connections to the console
        console.log(`+ ${socket.handshake.address} connected`);

        socket.on('trigger', () => {
            console.log('% trigger');
            io.sockets.emit('trigger');
        });

        socket.on('disconnect', () =>
            // Log disconnections to the console
            console.log(`- ${socket.handshake.address} disconnected`));
    });
}
