const http = require('http')
const app = require('./app')
const inquirer = require('inquirer')

const questionEngine = require('./question-engine');

console.log("Welcome on Musicovore Quizz")

let wantToPlay = ({
		message: "Enter a word or setence to seach",
		type: 'input',
		name: "search"
})

inquirer.prompt(wantToPlay).then(function (answer) {
  if (!answer.search) {
    console.log("Have a nice day")
    return
  }
	questionEngine(answer.search)
})

//let server = http.createServer(app)
//server.listen(8000)
