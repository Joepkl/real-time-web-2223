## Course description

During this course you will learn how to build a real-time application. You will learn techniques to setup an open connection between the client and the server. This will enable you to send data in real-time both ways, at the same time.


## Assignment

I chose to make a Trivia quiz app. This app supports multi user functionalities and is a real time application. Meaning the users are instantly updated on a data change. This makes it possible to play with multiple users against each other. 

## The API

For this project I used the https://opentdb.com/ API. This API includes questions about different topics, difficulty, true/false or multiple choice questions. For my application I decided to only use multiple choice questions about computer science. 

## Data-flow diagram

This is an overview of the data which is transferred between client, server and API in the application. 

<img width="800" alt="Data diagram" src="https://github.com/Joepkl/real-time-web-2223/assets/74242736/00ca10c8-97cc-4615-9d9e-1027076db59e">


## Installing the project

```
Git clone this project
```
```
npm install
```
```
npm start
```

## The application

To start there is a prompt to fill in your username. When submitted the user will see the following UI. There is an overview of all the users and points. When a user reaches 5 points the game is won. This resets all the points and displays a play again button for users to start another game. Also there is a chat functionality for users to chat with each other. 

<img width="800" alt="The application" src="https://github.com/Joepkl/real-time-web-2223/assets/74242736/79e8ecd2-731e-49b5-831a-d40b71aa72b3">



## Features
- Fetch questions from API
- Submit answer
- Check answer
- Show first correct user
- Add points
- Chat with other users
- Win the game
- Restart the game


## Sources

- OpenTDB API
https://opentdb.com/

- Socket.io
https://socket.io/docs/v4/



<!-- Here are some hints for your projects Readme.md! -->

<!-- Start out with a title and a description -->

<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Add a link to your live demo in Github Pages 🌐-->

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- ☝️ replace this description with a description of your own work -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- This would be a good place for your data life cycle ♻️-->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- We all stand on the shoulders of giants, please link all the sources you used in to create this project. -->

<!-- How about a license here? When in doubt use MIT. 📜  -->
