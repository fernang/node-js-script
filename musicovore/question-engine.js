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
		  choices: artistChoices.map(function(d) {
        return d.title
      })
  })
}

function getArtistChoices(search) {
  return new Promise((resolve, reject) => {
    session.search(search, {page: 1, per_page: 25}, function(err, data){
      if (err) {
          console.log(err)
          reject(err)
          return
      }

      result = data.results
        .filter(function(d) {
          if (_.indexOf(d, "type") && d.type == "artist")
            return d
        })
console.log(result)
      resolve(result)
    })
  })
}

function getInformationOnArtistByUri(artistUri)
{

  session.getArtist(artistUri, function(err, data){
    if (err) {
        console.log(err)
        return
    }

    console.log(data)

  })
}

function displayQuestion(search) {
  Promise.all([
	  connect(),
	  getArtistChoices(search)
  ]).then((values) => {
    artistChoices = values[1]
    inquirer.prompt(getQuestionType(artistChoices)).then(function (answer) {
      console.log(answer['artists'])
      selectedArtistUri = artistChoices.filter(function(d) {
        if (d.title == answer['artists'])
          return d.id
      }).map(function(d) {
        return d.uri
      })

      getInformationOnArtistByUri(selectedArtistUri)
      console.log("You selected " + answer['artists'] + " you can find information below")

    })
  });

}

module.exports = displayQuestion
