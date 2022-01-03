const express = require('express');
const connection = require('./db-config')
const app = express();
const socketPort = 5000; 
const routes = require('./routes/index')


const http = require("http").createServer(app);
require("./config/socket")(http);

app.use(express.json())

app.use('/channels', routes.channels)
app.use('/users', routes.users)

connection.connect(err => {
    if (err) {
      console.error('error connecting: ' + err.stack)
    } else {
      console.log('connected as id ' + connection.threadId)
    }
  })

try{
    http.listen(socketPort, () => {
        console.info("Server listening on port : " + socketPort);
    });
} catch(e) {
    console.log("Server error on port : " + socketPort);
}
