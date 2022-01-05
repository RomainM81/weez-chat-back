const express = require('express')
const mysql = require('../db-config')

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
        const sqlValue = [data.message, data.sentByMe, data.sendTo, data.channelId]
        mysql.query('INSERT INTO messages (text, date_created,  id_author, id_dest, id_channel) VALUES (?, NOW(), ?, ?, ?)',
        sqlValue, (err, result) => {
          if(err) {
            console.log(err)
          } else {
            socket.broadcast.emit('message-receive',data)
          }
        })
        
    })

    socket.off('message', () => {
        console.log('waiting new msg')
    })
    });
}

module.exports = socket;