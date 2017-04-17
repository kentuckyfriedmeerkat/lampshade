export default socket => {
    console.log(`- ${socket.handshake.address} connected`);

    socket.on('disconnect', () =>
        console.log(`- ${socket.handshake.address} disconnected`));
}
