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

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('Connected')
  

  socket.on('transaction', (tx) => {
    console.log('Created transaction: ', tx)
    io.sockets.emit('create tx', tx)
  })

  socket.on('disconnect', () => {
    console.log('Disconnected')
  })
})


server.listen(port, () => console.log(`Listening on port ${port}`))
