const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

// our localhost port
const port = 5000

const app = express()

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)


io.on('connect', onConnect)

function onConnect(socket){
  console.log('Connected')
  socket.emit('Hello!, you just joined the party')


  socket.on('transact', (data) => {
    console.log(`${data.user}: `, data.transaction)
    socket.broadcast.emit('transact', data )
  })

  socket.on('disconnect', () => {
    console.log('Disconnected')
  })
}

server.listen(port, () => console.log(`Listening on port ${port}`))
