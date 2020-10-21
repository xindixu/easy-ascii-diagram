const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const util = require('util')
const path = require('path')

// our localhost port
const port = process.env.PORT || 8000

const app = express()

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

io.on('connect', onConnect)

const channel = {
  transact: "transact",
  logIn: "logIn",
  joinRoom: "joinRoom",
  createRoom: "createRoom"
}

function onConnect(socket){
  console.log('Connected')
  socket.emit('Hello!, you just joined the party')

  socket.on(channel.logIn, (data) => {
    console.log(`${data.user} just log in `)
    socket.broadcast.emit(channel.join, data)
  })

  socket.on(channel.transact, (data) => {
    console.log(util.inspect(data))
    const {room} = data
    socket.broadcast.to(room).emit(channel.transact, data)
  })

  socket.on(channel.createRoom, (data) => {
    const {room, user} = data
    console.log(`${user} created room: ${room}`)
    socket.join(data.room)
  })

  socket.on(channel.joinRoom, (data) => {
    const {room, user} = data
    socket.join(room)
    socket.broadcast.to(room).emit(`${user} joined room: ${room}`)
  })


  socket.on('disconnect', () => {
    console.log('Disconnected')
  })
}


app.use(express.static(path.join(__dirname, "build")))
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"))
})

server.listen(port, () => console.log(`Listening on port ${port}`))
