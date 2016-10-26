const querystring = require('querystring');
const http = require('http');
const inquirer = require('inquirer')
const _ = require('lodash')
const Discogs = require('disconnect').Client;

let session

//doc: 'https://www.discogs.com/developers/'

function connect() {
  return new Promise((resolve, reject) => {
    // Authenticate by consumer key and secret
    session = new Discogs({
        consumerKey: 'jdLBZGCqhKIbpqEJeKag',
        consumerSecret: 'YOpNDzoaABKeURCPuNVFkLtHoWEjxNYZ'
    }).database()

		if (!session)
      reject(session)

    resolve(session)
	})
}

function getQuestionType(artistChoices) {
  return wantToPlay = ({
  		message: "Which artists ?",
  		type: 'list',
  		name: "artists",
		  choices: artistChoices
  })
}

function getArtistChoices(search) {
  return new Promise((resolve, reject) => {
    session.search(search, {page: 1, per_page: 4}, function(err, data){
      if (err) {
          console.log(err)
          reject(err)
          return
      }

console.log(data.results  )
      result = data.results
        .map(function(d) {
          if (_.indexOf(d, "type") && d.type == "artist")
            return d.title
        })
        /*.map(function(d) {
          if (_.indexOf(d, "artist") && d.type == "artist")
            return d.title
        })*/

      resolve(result)
    })
  })
}

function displayQuestion(search) {
  Promise.all([
	  connect(),
	  getArtistChoices(search)
  ]).then((values) => {
    artistChoices = values[1]
    inquirer.prompt(getQuestionType(artistChoices)).then(function (answer) {
        console.log(answer)
    })
  });

}

module.exports = displayQuestion
