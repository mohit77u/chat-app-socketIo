// dot env file configure
require('dotenv').config();

// express ap init
const express = require("express")
const app = express()

// socket options
const http = require('http').Server(app);
const socketIO = require('socket.io')(http, {
  cors: {
    origin: process.env.CLIENT_URL
  }
});

// apply cors
const cors = require("cors")
app.use(cors())

// user array
let users = []

// import { writeFile } from "fs";
// socket io connection
socketIO.on('connection', (socket) => {
  console.log('New user just connected!')  

  // handle send message
  socket.on("message", data => {
    socketIO.emit("messageResponse", data)
  })

  // handle show typing user
  socket.on("typing", data => (
    socket.broadcast.emit("typingResponse", data)
  ))

  // handle register new user
  socket.on("newUser", data => {
    users.push(data)
    socketIO.emit("newUserResponse", users)
  })

  // // handle file uploads
  // socket.on("upload", (file, callback) => {
  //   console.log(file); // <Buffer 25 50 44 ...>

  //   // save the content to the disk, for example
  //   writeFile("/client/public/uploads", file, (err) => {
  //     callback({ message: err ? "failure" : "success" });
  //   });
  // });

  // handle leave chat
  socket.on('disconnect', () => {
    console.log('User disconnected');
    // remove users after user leave chat
    users = users.filter(user => user.socketID !== socket.id)
    // re-populate new user response
    socketIO.emit("newUserResponse", users)
    // disconnect the socket for that user
    socket.disconnect()
  });
});


// for production routes serve static files
if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'))
  const path = require('path')
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}

// demo route
app.get("/api", (req, res) => {
  res.json({message: "Hello"})
});

// listhen the express app  
http.listen(process.env.PORT || 4000, () => {
  console.log(`Server listening on ${process.env.PORT}`);
});