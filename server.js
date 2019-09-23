const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

// our localhost port
const port = 8000

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


  socket.on(channel.transact, (data) => {
    console.log(`${data.user}: `, data.transaction)
    socket.broadcast.emit(channel.transact, data )
  })

  socket.on(channel.logIn, (data) => {
    console.log(`${data.user} just log in `)
    socket.broadcast.emit(channel.join, data )
  })

  socket.on(channel.createRoom, (data) => {
    console.log(`create room: ${data.roomId} `)
    socket.join(data.roomId)
  })

  socket.on(channel.joinRoom, (data) => {
    console.log(`join room: ${data.roomId} `)
    socket.join(data.roomId)
  })


  socket.on('disconnect', () => {
    console.log('Disconnected')
  })
}

server.listen(port, () => console.log(`Listening on port ${port}`))
