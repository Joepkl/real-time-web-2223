const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const path = require('path')
const port = process.env.PORT || 4242
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


let clients = []
let data
let amountAnswers = 0

 


async function fetchTrivia() {
  const response = await fetch("https://opentdb.com/api.php?amount=1&category=18&difficulty=easy&type=multiple");
  const jsonData = await response.json();
  data = await jsonData.results[0]
}


// Serveer client-side bestanden
app.use(express.static(path.resolve('public')))



// Socket.io
io.on('connection', (socket) => {

  console.log('user connected')

  // Fetch data from API
  fetchTrivia()
  io.emit('triviaData', data)


  // User added to game
  socket.on('userAdded', (username, points) => {
    clients.push([username, points, socket.id])
    io.emit('userAdded', clients)
  })
  

  // Add message to chat
  socket.on('message', (message, sender) => {
    io.emit('message', message, sender)
  })


  // Check if all clients answered
  socket.on('answerGiven', () => {

    amountAnswers = amountAnswers + 1
    console.log(amountAnswers)
    if(amountAnswers === clients.length){
      amountAnswers = 0
      io.emit('allClientsAnswered')
      setTimeout(() => {
        fetchTrivia()
        io.emit('triviaData', data)
      },3000)
    }
  })
  

  // Correct answer by client
  socket.on('correctAnswer', (user, points) => {
    amountAnswers = 0

    const correctUser = clients.find(element => element[0] == user)
    correctUser[1] = points

    io.emit('userAdded', clients)
    io.emit('correctAnswer', user)

    setTimeout(() => {
      fetchTrivia()
      io.emit('triviaData', data)
    },3000)
  })


  // User won
  socket.on('userWon', (username) => {
    io.emit('userWon', username)
    console.log(clients)
  })


  // Play again
  socket.on('playAgain', () => {
    clients = []
    io.emit('playAgain')
    console.log(clients)
  })


  // Client disconnected
  socket.on('disconnect', () => {
    clients.forEach(element => {
      if(element[2] == socket.id){
        const index = clients.indexOf(element)
        clients.splice(index, 1)
        io.emit('userAdded', clients)
      }
    })

    console.log('client disconnected')
  })
})


http.listen(port, () => {
  console.log('listening on http://localhost:' + port)
})

