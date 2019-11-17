const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator'); /* To validate on the server side */

const mongoose = require('mongoose');
const Models = require('./models.js');
const passport = require('passport');
require('./passport');

const Movies = Models.Movie;
const Users = Models.User;

const app = express();
app.use(bodyParser.json());

/* Cross Origin Resource Sharing */
const cors = require('cors');
app.use(cors());

var auth=require('./auth')(app);
var allowedOrigins = ['http://localhost:8080','http://testsite.com'];

// mongoose.connect('mongodb://127.0.0.1/WebFlixDB', {useNewUrlParser: true});
mongoose.connect('mongodb+srv://webFlixDBadmin:Hyperb0l@@cluster0-3axny.mongodb.net/WebFlixDB?retryWrites=true&w=majority',
	{useNewUrlParser: true});


// Content-Security-Policy: default-src 'self'

app.use(cors({
	origin: function(origin, callback) {
		if(!origin) return callback(null, true);
		if(allowedOrigins.indexOf(origin) === -1) {
			var message = 'The CORS policy for this application doesn\'t allow access from origin ' + origin ;
			return callback(new Error(message), false);
		}
		return callback(null, true);
	}
}));


//To send all the static files - html,css,images,javascript
app.use(express.static('public'));
//To log requests with timestamp, method, url, status and string length
app.use(morgan('common'));

//GET requests
app.get('/',function(req, res) {
	res.send('Welcome to WebFlix Movies Online!!');
});

app.get('/movies', passport.authenticate('jwt', {session: false }), function(req, res) {
	Movies.find().then(function(movies) {
		res.json(movies);
	}).catch(function(err) {
        res.status(500).send('Error: ' + err);
    });
});

app.get('/movies/:title', passport.authenticate('jwt', {session: false}), function(req, res){
	Movies.findOne({ Title: req.params.title }).then( function(movie) {
        console.log('Movies ' + movie);
		if (movie) {
			return res.status(200).json(movie);
		} else {
			res.status(500).send(req.params.Title + ' details do not exist!');
		}
	}).catch(function(err) {
		console.error(err);
		res.status(500).send('Error: ' + error);
	});
});

app.get('/movies/genre/:genre', passport.authenticate('jwt', {session: false}), function(req, res) {
	Movies.findOne({'Genre.Name': req.params.genre}).then(function(movie) {
		if (movie.Genre.Description) {
			return res.status(400).send(req.params.genre + ' : ' + movie.Genre.Description);
		} else {
			res.status(500).send(req.params.genre + ' details do not exist!');
        }
	}).catch( function(err) {
			console.error(err);
			res.status(500).send('Error: ' + error);
	});
});

app.get('/movies/director/:director', passport.authenticate('jwt', {session: false}), function(req, res) {
	Movies.findOne({'Director.Name': req.params.director}).then( function(movie) {
		if(movie.Director.Name) {
			return res.status(400).json(movie.Director);
		} else {
			res.status(500).send(req.body.Director + ' details do not exist.');
		}
	}).catch( function(err) {
		console.error(err);
		res.status(500).send('Error: ' + error);
	});
});

// app.get('/users', passport.authenticate('jwt', {session: false}), function(req, res) {
// 	Users.find().then(function(users) {
// 		return res.status(200).json(users);
// 	}).catch(function(err) {
// 		console.error(err);
// 		res.status(500).send('Error: ' + error);
// 	})
// });

app.get('/users/:username', passport.authenticate('jwt',{session: false}), function(req,res) {
	Users.findOne({ username: req.params.username }).then( function(user){
		return res.status(200).json(user);
	}).catch( function(err) {
		console.error(err);
		res.status(500).send('Error: ' + error);
	})
});

//POST requests
// app.post('/users', passport.authenticate('jwt',{session: false}), function(req,res) {
app.post('/users',
	[check('username', 'Username is must with at least 4 chars long.').isLength({min: 4}),
	check('username','Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
	check('password','Passowrd is required.').not().isEmpty(),
	check('emailID','Email does not appear to be valid.').isEmail()], (req,res) => {
		var errors = validationResult(req);

		if(!errors.isEmpty()) {
			return res.status(422).json({errors: errors.array()});
		}

		var hashedPassword = Users.hashPassword(req.body.password)
		Users.findOne({ username: req.body.username })
	    .then(function(user) {
			if (user) {
				return res.status(400).send(req.body.username + ' user already exists!');
			} else {
				Users
	            .create({
					username: req.body.username,
					password: hashedPassword,
					emailID: req.body.emailID,
					birth: req.body.birth
				})
				.then(function(user) { res.status(201).json(user)})
				.catch(function(err) {
					console.error(err);
					res.status(500).send('Error: ' + error);
				})
			}
		}).catch(function(err){
			console.error(err);
			res.status(500).send('Error: ' + error);
		});
});

// PUT requests to update user's details
app.put('/users/:username', passport.authenticate ('jwt',{session: false}), function(req, res) {
	Users.findOneAndUpdate({username: req.params.username},
		{$set:{password: req.body.password,
			   emailID: req.body.emailID,
			   birth: req.body.birth}},
         {new: true})
	.then(function(user) { res.status(200).json(user)})
	.catch(function(err) {
		console.error(err);
		res.status(500).send('Error: ' + error);
	});
});

//POST requests to add favorite movies to the user
app.post('/users/:username/movie/:movie', passport.authenticate('jwt',{session: false}), function( req, res) {
	Users.findOneAndUpdate({ username: req.params.username },{$push:{favoriteMovies: req.params.movie}},{new: true})
	.then( function(user) {
		return res.status(200).json(user);
	}).catch(function(err){
		console.error(err);
		res.status(500).send('Error: ' + error);
	});
});

// DELETE request to remove movie from their listStyleType
app.delete('/users/:username/movie/:movie', passport.authenticate('jwt', {session: false}),function(req, res) {
	Users.findOneAndUpdate({username: req.params.username},
		{$pull: {favoriteMovies: req.params.movie}},{new: true})
	.then(function(user) {
		res.status(200).json(user)
	}).catch(function(error) {
		console.error(error);
		res.status(500).send('Error: ' + error);
	});
});

// DELETE request to remove movie from their listStyleType
app.delete('/users/:username', passport.authenticate('jwt', {session: false}), function(req, res) {
    var unregisteredUser = req.params.username;
	Users.findOneAndRemove({username: req.params.username})
	.then(function(user) {
		res.status(200).send( unregisteredUser + ' has been removed.');
	}).catch(function(error) {
		console.error(error);
		res.status(500).send('Error: ' + error);
	});
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something Broken!');
});

// app.listen(8080, function () {
//     console.log('WebFlix is listening on port 8080.')
// });

var port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', function() {
	console.log('Listening to the port 3000');
});
