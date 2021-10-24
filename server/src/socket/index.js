function ioEventTransciever(socket, io) {
    // On Connection Send private message to your connections
    socket.on('join', (msg, mySocketId) => {
        console.log(msg, mySocketId)
        socket.broadcast.emit('joinNotification', `User Joined: ${mySocketId}`, mySocketId)
        // socket.to(anotherSocketId).emit("private message", socket.id, msg);
    });
    socket.on("privateMessage", (anotherSocketId, msg) => {
        socket.to(anotherSocketId).emit("privateMessage", socket.id, msg);
    });

}
module.exports = ioEventTransciever