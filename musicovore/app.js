const express = require('express');
const pug = require('pug');
const bodyParser = require('body-parser')

//const authRouter = require('./lib/route/auth')

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.set('x-powered-by', false);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.locals.title = 'Filmovore'

app.get('/', (req, res) => {
	res.render('index')
})

app.use((err, req, res, next) => {
	console.error('oops An error has occured', err)
	res.send(500)
})

//authRouter(app)

module.exports = app;
