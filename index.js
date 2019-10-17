const express = require('express'),
    morgan = require('morgan');
const app = express();

let top10Movies = [
    {
        title: 'Avengers - Endgame',
        director: 'Joe Russo, Anthony Russo'
    },
    {
        title: 'Toy Story 4',
        director: 'Josh Cooley'
    },
    {
        title: 'Too late to die young',
        director: 'Dominga Sotomayor Castillo'
    },
    {
        title: 'Hotel Mumbai',
        director: 'Anthony Maras'
    },
    {
        title: 'Captain Marvel',
        director: 'Anna Boden, Ryan Fleck'
    },
    {
        title: 'Everybody knows',
        director: 'Asghar Farhadi'
    },
    {
        title: 'Good Boys',
        director: 'Gene Stupnisky'
    },
    {
        title: 'Photograph',
        director: 'Ritesh Batra'
    },
    {
        title: 'Dora',
        director: 'James Bobin'
    },
    {
        title: 'The Lego Movie 2',
        director: 'Mike Mitchell'
    }
]

//To send all the static files - html,css,images,javascript
app.use(express.static('public'));
//To log requests with timestamp, method, url, status and string length
app.use(morgan('common'));

app.get('/',function (req, res) {
    res.send('Welcome to WebFlix Movies Online!')
});

app.get('/movies', function (req, res) {
    res.json(top10Movies)
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something Broken!');
});

app.listen(8080, function () {
    console.log('WebFlix is listening on port 8080.')
});
