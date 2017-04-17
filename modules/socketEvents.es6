export default socket => {
    // Log connections to the console
    console.log(`- ${socket.handshake.address} connected`);

    socket.on('disconnect', () =>
        // Log disconnections to the console
        console.log(`- ${socket.handshake.address} disconnected`));
}
