const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();

app.use(bodyParser.json());

let top10Movies = [
    {
        title: 'Avengers Endgame',
        director: 'Joe Russo, Anthony Russo',
        genre: 'Fantasy',
        imageUrl: 'img/AvengersEndGame.jpg'
    },
    {
        title: 'Toy Story 4',
        director: 'Josh Cooley',
        genre: 'Fantasy',
        imageUrl: 'img/ToyStory4.jpg'
    },
    {
        title: 'Too late to die young',
        director: 'Dominga Sotomayor Castillo',
        genre: 'Drama',
        imageUrl: 'img/TLTDY.jpg'
    },
    {
        title: 'Hotel Mumbai',
        director: 'Anthony Maras',
        genre: 'History',
        imageUrl: 'img/HotelMumbai.jpg'
    },
    {
        title: 'Captain-Marvel',
        director: 'Anna Boden, Ryan Fleck',
        genre: 'Scifi',
        imageUrl: 'img/CaptainMarvel.jpg'
    },
]

//To send all the static files - html,css,images,javascript
app.use(express.static('public'));
//To log requests with timestamp, method, url, status and string length
app.use(morgan('common'));

//GET requests
app.get('/',function (req, res) {
    res.send('Welcome to WebFlix Movies Online!')
});

app.get('/movies', function (req, res) {
    res.json(top10Movies)
});

app.get('/movies/:title', function (req, res) {
    res.send('Successful GET request returning a specific movie based on title.');
});

app.get('/genre/:genre', function (req, res) {
    res.send('Successful GET request returning genre\'s description.');
});

app.get('/director/:director', function (req, res) {
    res.send('Successful GET request returning director\'s bio.');
});

//POST requests
app.post('/users/:userName', function (req, res) {
    res.send('Successful POST request creating a new user.');
});

app.post('/users/:userName/:movie', function (req, res) {
    res.send('Successful POST request creating a favorite movie list for the  user.');
});

//PUT requests
app.put('/users/:userName/:password/:emailId/:dob', function (req, res) {
    res.send('Successful PUT request updating user personal details.');
});

//DELETE requests
app.delete('/users/:userName/:movie', function (req, res) {
    res.send('Successful DELETE request removing the specific movie from the user\'s favorite list.');
});

app.delete('/users/:userName', function (req, res) {
    res.send('Successful DELETE request removing the user from WebFlix Movie App.');
});


app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something Broken!');
});

app.listen(8080, function () {
    console.log('WebFlix is listening on port 8080.')
});
