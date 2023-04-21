// let socket = io();

// let messages = document.querySelector('section ul')
// let input = document.querySelector('input')


// // VERSTUURT message event naar server
// document.querySelector('form').addEventListener('submit', (event) => {
//   event.preventDefault()
//   if (input.value) {
//     socket.emit('message', input.value)
//     input.value = ''
//     // Dislay username bij message
//     let user = document.createElement('p')
//     user.textContent = username
//     messages.appendChild(user)
//   }
// })


// // LUISTERT naar message emit van server
// socket.on('message', function(message) {
//   let element = document.createElement('li')
//   element.textContent = message
//   messages.appendChild(element)
//   messages.scrollTop = messages.scrollHeight
// })



// VERSTUURT username event naar server
// const username = prompt("Please enter your username:");
// socket.emit('username', username);


// LUISTERT naar username event van server
// socket.on('username', function(username){
//   let user = document.createElement('li')
//   user.textContent = username
//   document.querySelector('#users').appendChild(user)
// })




// // Luistert naar history event en add info in history
// socket.on('history', (history) => {
//   history.forEach((message) => {
//     addMessage(message)
//   })
// })

// function addMessage(message) {
//   messages.appendChild(Object.assign(document.createElement('li'), { textContent: message }))
//   messages.scrollTop = messages.scrollHeight
// }




// Luister naar longpolling event interval
// socket.on('event', (message) => {
//   let textElement = document.createElement('p')
//   textElement.textContent = message
//   messages.appendChild(textElement)
// })




let socket = io()
let messages = document.querySelector('section ul')
let input = document.querySelector('input')


// Emit MESSAGE event naar server
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault()
  if (input.value) {
    socket.emit('message', input.value)
    input.value = ''
    socket.emit('userWhoSends', myUsername)
  }
})

// Emit USERADDED event naar server
const myUsername = prompt("Please enter your username:");
socket.emit('userAdded', myUsername);




// Luisteren naar events vanaf server
socket.on('message', (message) => {
  addMessage(message)
})

socket.on('whatever', (message) => {
  addMessage(message)
})

socket.on('userAdded', (username) => {
  addUser(username)
})

socket.on('userWhoSends', (usernameSender) => {
  // element textcontent = username
  document.querySelector('.username:last-of-type').textContent = usernameSender
})

socket.on('history', (history) => {
  history.forEach((message) => {
    addMessage(message)
  })
})


function addMessage(message) {
  let element = document.createElement('li')
  let user = document.createElement('p')
  user.classList.add('username')
  element.textContent = message
  messages.appendChild(element)
  messages.appendChild(user)
  messages.scrollTop = messages.scrollHeight
}

function addUser(username){
  let user = document.createElement('li')
  user.textContent = username
  document.querySelector('#users').appendChild(user)
}
