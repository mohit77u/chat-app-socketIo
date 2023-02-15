// dot env file configure
require('dotenv').config();

// express ap init
const express = require("express")
const app = express()
const cors = require("cors")
const http = require('http').Server(app);
const socketIO = require('socket.io')(http, {
  cors: {
      origin: "http://localhost:3000"
  }
});
import { writeFile } from "fs";

// apply cors
app.use(cors())
let users = []

// socket io connection
socketIO.on('connection', (socket) => {
    console.log(`${socket.id} user just connected!`)  

    // send message
    socket.on("message", data => {
      socketIO.emit("messageResponse", data)
    })

    // on type
    socket.on("typing", data => (
      socket.broadcast.emit("typingResponse", data)
    ))

    // new user register
    socket.on("newUser", data => {
      users.push(data)
      socketIO.emit("newUserResponse", users)
    })

    // // handle file
    // socket.on("upload", (file, callback) => {
    //   console.log(file); // <Buffer 25 50 44 ...>
  
    //   // save the content to the disk, for example
    //   writeFile("/client/public/uploads", file, (err) => {
    //     callback({ message: err ? "failure" : "success" });
    //   });
    // });
 
    // disconenct user
    socket.on('disconnect', () => {
      console.log('A user disconnected');
      users = users.filter(user => user.socketID !== socket.id)
      socketIO.emit("newUserResponse", users)
      socket.disconnect()
    });
});

app.get("/api", (req, res) => {
  res.json({message: "Hello"})
});

   
http.listen(process.env.PORT || 4000, () => {
    console.log(`Server listening on ${process.env.PORT}`);
});