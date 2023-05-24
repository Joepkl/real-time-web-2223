let socket = io()
let messages = document.querySelector('#chat ul')
let input = document.querySelector('input')
const connected = false


// Emit USERADDED event naar server
const myUsername = prompt("Please enter your username:");
let myPoints = 0
socket.emit('userAdded', myUsername, myPoints);


// Emit MESSAGE event naar server
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault()
  if (input.value) {
    socket.emit('message', input.value, myUsername)
    input.value = ''
  }
})


// Message event from server
socket.on('message', (message, sender) => {
  addMessage(message)
  document.querySelector('.username:last-of-type').textContent = sender
})


// User added event from server
socket.on('userAdded', (clients) => {
  const users = document.querySelectorAll('#users-list li')
  users.forEach(element => {
    element.remove()
  })

  for(let i = 0; i < clients.length; i++){
    userList = document.querySelector('#users-list')

    let user = document.createElement('li')
    user.textContent = clients[i][0]
    userList.appendChild(user)
  
    let userPoints = document.createElement('p')
    userPoints.textContent = clients[i][1]
    document.querySelector('#users-list li:last-of-type').appendChild(userPoints)
  }
})



// User won event from server
socket.on('userWon', (user) => {
  document.querySelector('#correct-user').textContent = `${user} has won the game!`
  document.querySelector('#trivia').style.display = 'none'
  document.querySelector('#chat').style.display = 'none'

  document.querySelector('#play-again-button').style.display = 'block'
})


// Play again event from server
socket.on('playAgain', () => {
  myPoints = 0
  socket.emit('userAdded', myUsername, myPoints);
  document.querySelector('#play-again-button').style.display = 'none'
  document.querySelector('#trivia').style.display = 'block'
  document.querySelector('#chat').style.display = 'block'
})




// Trivia

// Wanneer data gefetched is
socket.on('triviaData', (data) =>{
  showQuestions(data)
})


// Wanneer client correct antwoord heeft gegeven
socket.on('correctAnswer', (user) => {
  let selectedAnswer =  document.querySelector('button.selected') 
  const submitButton = document.querySelector('#submit-button')
  submitButton.disabled = true
  submitButton.classList.add('clicked')

  document.querySelector('#correct-user').textContent = `${user} gave the correct answer!`
})



socket.on('allClientsAnswered', () => {
  document.querySelector('#correct-user').textContent = 'Nobody got the correct answer'

  setTimeout(() => {
    document.querySelector('#correct-user').textContent = ''
  },3000)


  let selectedAnswer =  document.querySelector('button.selected') 
  if(selectedAnswer){
    selectedAnswer.classList.remove('selected')
  }
})



const _question = document.querySelector('#question')
const _options = document.querySelectorAll('.quiz-options')
const submitButton = document.querySelector('#submit-button')
let correctAnswer



// Display questions and answers
function showQuestions(data){
  correctAnswer = data.correct_answer
  let incorrectAnswers = data.incorrect_answers
  let optionsList = incorrectAnswers
  optionsList.splice(Math.floor(Math.random() * (incorrectAnswers.length + 1)), 0, correctAnswer)

  _question.innerHTML = data.question
  _options[0].innerHTML = optionsList[0]
  _options[1].innerHTML = optionsList[1]
  _options[2].innerHTML = optionsList[2]
  _options[3].innerHTML = optionsList[3]

  console.log('Correct is:' + correctAnswer)

  
  let selectedAnswer =  document.querySelector('button.selected') 
  submitButton.disabled = false
  document.querySelector('#correct-user').textContent = ''
  if(selectedAnswer){
    selectedAnswer.classList.remove('selected')
  }
  if(submitButton){
    submitButton.classList.remove('clicked')
  }
}


// Checking correct answer
submitButton.addEventListener('click', () =>{
  let selectedAnswer =  document.querySelector('button.selected') 
  if(selectedAnswer){
    socket.emit('answerGiven')
    submitButton.classList.add('clicked')
    submitButton.disabled = true
    if(selectedAnswer.textContent === HTMLDecode(correctAnswer)){
      myPoints++
      socket.emit('correctAnswer', myUsername, myPoints)
    }
    if(myPoints === 5){
      socket.emit('userWon', myUsername)
    }
  }
})


// Selecting correct answer
_options.forEach(element => {
  element.addEventListener('click', () =>{
    if(document.querySelector('button.selected')){
      const activeOption = document.querySelector('button.selected')
      activeOption.classList.remove('selected');
    }
    element.classList.add('selected')
  })
})


// Decoding in case there are HTML elments in answer
function HTMLDecode(textString) {
  let doc = new DOMParser().parseFromString(textString, "text/html");
  return doc.documentElement.textContent;
}



// Play again button
document.querySelector('#play-again-button').addEventListener('click', () => {
  socket.emit('playAgain')
})






// Sent message to chat
function addMessage(message) {
  let element = document.createElement('li')
  let user = document.createElement('p')
  user.classList.add('username')
  element.textContent = message
  messages.appendChild(element)
  messages.appendChild(user)
  messages.scrollTop = messages.scrollHeight
}

// Add username to user list
function addUser(username){
  let user = document.createElement('li')
  user.textContent = username
  document.querySelector('#users').appendChild(user)
}
