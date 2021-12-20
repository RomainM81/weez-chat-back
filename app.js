const express = require('express');
const connection = require('./db-config')
const app = express();
const PORT = process.env.PORT || 4000;
const routes = require('./routes/index')
const io = require('socket.io')(server);

app.use(express.json())

connection.connect(err => {
  if(err) {
    console.error('error connecting: ' + err.stack)
  } else {
    console.log('connected as id ' + connection.threadId)
  }
})

io.on('connection', (socket)=> {
    console.log("Connected Successfully", socket.id);
    socket.on('disconnect', ()=>{
        console.log("Disconnected", socket.id);
    })

    socket.on('message',(data)=>{
        console.log(data);
        socket.broadcast.emit('message-receive',data)
    })
});

app.listen(PORT, ()=>{
  console.log('Server is Started', PORT);
});