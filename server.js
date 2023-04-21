// // Node opzetten en Express en HTTP gebruiken
// const express = require('express')
// const app = express()
// const http = require('http').createServer(app)

// http.listen(4242, () => {
//   console.log('listening on localhost:4242')
// })




// // Serveer het public path aan de gebruiker
// const path = require('path')
// app.use(express.static(path.resolve('public')))



// // Gebruik Socket.io
// const io = require('socket.io')(http)
// const port = process.env.PORT || 4242



// // Max history of server
// const historySize = 50
// let history = []

// let allUsers = []


// // IO = Server, Socket = Client connection
// io.on('connection', (socket) => {
//   console.log('a user connected');
//   io.emit('history', history)
//   // Luistert wanneer gebruiker disconnect 
//   socket.on('disconnect', () => {
//     console.log('user disconnected')
//   })
//   // Luistert wanneer gebruiker "message" event afvuurt, emit message naar alle clients
//   socket.on('message', (message) => {
//     while (history.length > historySize){
//       history.shift()
//     }
//     history.push(message)
//     io.emit('message', message)
//   })
//   // Luistert wanneer het "username" event afvuurt
//   socket.on('username', (username) => {
//     users.push(username)
//     io.emit('username', username)
//   })
// });




// Longpolling proces interval starten
// setInterval(callApi, 2500, io)

// Call API
// function callApi(io){
//   io.emit('event', 'blablabla')
// }





const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const path = require('path')
const port = process.env.PORT || 4242

// Start het longpolling proces, geef io mee
// setInterval(callApi, 2500, io)

const historySize = 50
let history = []

// Serveer client-side bestanden
app.use(express.static(path.resolve('public')))

io.on('connection', (socket) => {
  // console.log('a user connected')
  io.emit('history', history)

  socket.on('message', (message) => {
    while (history.length > historySize) {
      history.shift()
    }
    history.push(message)

    io.emit('message', message)
  })

  socket.on('userAdded', (username) => {
    io.emit('userAdded', username)
  })

  socket.on('userWhoSends', (usernameSender) => {
    io.emit('userWhoSends', usernameSender)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

function callApi(io) {
  io.emit('whatever', 'somebody set up us the bomb!')
}

http.listen(port, () => {
  console.log('listening on http://localhost:' + port)
})