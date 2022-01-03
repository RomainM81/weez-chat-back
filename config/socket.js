const socket = (http) => {
    const io = require("socket.io")(http, {
        cors: {
            origin: "*",
            methods: ["*"],
        },
    });
    console.log("Socket is connected ");


    io.on("connection", (socket) => {
        console.log("Connected Successfully", socket.id);
    socket.on('disconnect', ()=>{
        console.log("Disconnected", socket.id);
        socket.removeAllListeners();
    })

    socket.on('message',(data)=>{
        console.log(data);
        socket.broadcast.emit('message-receive',data)
    })

    socket.off('message', () => {
        console.log('waiting new msg')
    })
    });
}

module.exports = socket;