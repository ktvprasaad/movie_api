const path = require('path');
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

//Initializing app variable
const app = express();
app.use(bodyParser.json());

// Cross Origin Resource Sharing 
const cors = require('cors');
app.use(cors());

var auth=require('./auth')(app);
// var allowedOrigins = ['http://localhost:8080','http://testsite.com'];
// var allowedOrigins = * ;

// mongoose.connect('mongodb://127.0.0.1/WebFlixDB', {useNewUrlParser: true});
mongoose.connect('mongodb+srv://webFlixDBadmin:Hyperb0l@@cluster0-3axny.mongodb.net/WebFlixDB?retryWrites=true&w=majority',
	{useNewUrlParser: true, useUnifiedTopology: true});

/** To send all the static files - html,css,images,javascript */
app.use(express.static('public'));
app.use('/client',express.static(path.join(__dirname, 'client', 'dist')));
app.get('/client/*', (req,res) => {
	res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
/** 
 * @function use(morgan)
 * @description To log requests with timestamp, method, url, status and string length 
 * @param common
 */
app.use(morgan('common'));

//GET requests
// app.get('/',function(req, res) {
// 	res.send('Welcome to WebFlix Movies Online!!');
// });

// To view movies list without authentication
// app.get('/movies', function(req, res) {
/**
 * @function get-movies
 * @param {string} movies
 * @param {function} token - passport authentication
 * @param {function}  reqRes - req & res
 * @description To get Title, Description, Genre, Director & Image
 */
app.get('/movies', passport.authenticate('jwt', {session: false }), function(req, res) {
	Movies.find().then(function(movies) {
		res.json(movies);
	}).catch(function(err) {
        res.status(500).send('Error: ' + err);
    });
});

/**
 * @function get-users
 * @param {string} users
 * @param {function} token - passport authentication
 * @param {function} reqRes - req & res
 * @description To get Title, Description, Genre, Director & Image
 */
app.get('/users', passport.authenticate('jwt', {session: false }), function(req, res) {
	Users.find().then(function(users) {
		res.json(users);
	}).catch(function(err) {
        res.status(500).send('Error: ' + err);
    });
});

/**
 * @function get-movies-title
 * @param {string} movies - get movie passing title
 * @param {function} token - passport authentication
 * @param {function}  reqRes - req & res
 * @description To get Title, Description, Genre, Director & Image
 */
// app.get('/movies/:title', passport.authenticate('jwt', {session: false}), function(req, res){
app.get('/movies/:title', function(req, res){
	Movies.findOne({ Title: req.params.title }).then( function(movie) {
        console.log('Movies ' + movie);
		if (movie) {
			return res.status(200).json(movie);
		} else {
			res.status(500).send(req.params.title + ' movie does not exist!');
		}
	}).catch(function(err) {
		console.error(err);
		res.status(500).send('Error: ' + error);
	});
});

/**
 * @function get-movies-genre
 * @param {string} movies - get movies passing genre
 * @param {function} token - passport authentication
 * @param {function}  reqRes - req & res
 * @description To get Title, Description, Genre, Director & Image
 */
app.get('/movies/genre/:genre', passport.authenticate('jwt', {session: false}), function(req, res) {
	Movies.findOne({'Genre.Name': req.params.genre}).then(function(movie) {
		if (movie) {
			return res.status(200).json({[req.params.genre]: movie.Genre.Description});
		} else {
			res.status(500).send(req.params.genre + ' genre type does not exist!');
        }
	}).catch( function(err) {
			console.error(err);
			res.status(500).send('Error: ' + error);
	});
});

/**
 * @function get-movies-director
 * @param {string} movies - get director detail passing director name
 * @param {function} token - passport authentication
 * @param {function}  reqRes - req & res
 * @description To get Name, Bio, Birth & Death details
 */
app.get('/movies/director/:director', passport.authenticate('jwt', {session: false}), function(req, res) {
	Movies.findOne({'Director.Name': req.params.director}).then( function(movie) {
		if(movie) {
			return res.status(400).json(movie.Director);
		} else {
			res.status(500).send(req.params.director + ' director\'s details do not exist.');
		}
	}).catch( function(err) {
		console.error(err);
		res.status(500).send('Error: ' + error);
	});
});

/**
 * @function get-users-username
 * @param {string} users - get users' profile passing username
 * @param {function} token - passport authentication
 * @param {function}  reqRes - req & res
 */
app.get('/users/:username', passport.authenticate('jwt', {session: false}), function(req, res) {
	Users.findOne({Username: req.params.username}).then( function(user) {
		if(user) {
			return res.status(400).json(user);
		} else {
			res.status(500).send(req.params.username + ' user\'s details do not exist.');
		}
	}).catch( function(err) {
		console.error(err);
		res.status(500).send('Error: ' + error);
	});
});

//POST requests
// app.post('/users', passport.authenticate('jwt',{session: false}), function(req,res) {
/**
 * @function get-users-add
 * @param {string} users - get users' profile passing username
 * @param {function} token - passport authentication
 * @param {function}  reqRes - req & res
 * @description - Validates user's details whether they are valid or not and add it to the database provided the user
 * not already signed up.
 */
app.post('/users',
	[check('Username', 'Username must have at least 4 chars long.').isLength({min: 4}),
	check('Username','Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
	check('Password','Password is required.').not().isEmpty(),
	check('Email','Email does not appear to be valid.').isEmail(),
	check('Birthday','Birthday is required.').not().isEmpty()], (req,res) => {
		var errors = validationResult(req);

		if(!errors.isEmpty()) {
			return res.status(422).json({errors: errors.array()});
		}

		var hashedPassword = Users.hashPassword(req.body.Password);
		Users.findOne({ Username: req.body.Username })
	    .then(function(user) {
			if (user) {
				return res.status(400).send(req.body.Username + ' user already exists!');
			} else {
				Users
	            .create({
					Username: req.body.Username,
					Password: hashedPassword,
					Email: req.body.Email,
					Birthday: req.body.Birthday
				})
				// .then(function(user) { res.status(201).json(user)})
				.then(function(user) { res.status(201).send('Congratulations ' + req.body.Username + '! Your account has been created.')})
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
/**
 * @function get-users-update
 * @param {string} users - get users' profile passing username
 * @param {function} token - passport authentication
 * @param {function}  reqRes - req & res
 * @description - Update user details.
 */
app.put('/users/:Username', passport.authenticate ('jwt',{session: false}),
	[check('Password','Passowrd is required.').not().isEmpty(),
	check('Email','Email does not appear to be valid.').isEmail(),
	check('Birthday','Birthday is not valid.').not().isEmpty()],(req, res) => {
		var errors = validationResult(req);
		if(!isNaN(Date.parse(req.body.Birthday))) {
			console.error('Birthday is not valid');
		}
		if(!errors.isEmpty()) {
			return res.status(422).json({errors: errors.array()});
		}
		var hashedPassword = Users.hashPassword(req.body.Password)
		Users.findOneAndUpdate({Username: req.params.Username},
			{$set:{Password: hashedPassword,
				   Email: req.body.Email,
				   Birthday: req.body.Birthday}},
	         {new: true})
		// .then(function(user) { res.status(200).json(user)})
		.then(function(user) { res.status(200).send('Your personal details have been updated.')})
		.catch(function(err) {
			console.error(err);
			res.status(500).send('Error: ' + error);
		});
});

//POST requests to add favorite movies to the user
// PUT requests to update user's details
/**
 * @function get-users-favorite
 * @param {string} users - get users' profile passing username
 * @param {function} token - passport authentication
 * @param {function}  reqRes - req & res
 * @description - Updates favorite movie to the user's list.
 */
app.post('/users/:Username/movie/:movie', passport.authenticate('jwt',{session: false}), function( req, res) {
	Users.findOneAndUpdate({ Username: req.params.Username },{$push:{Favoritemovies: req.params.movie}},{new: true})
	.then( function(user) {
		return res.status(200).json({
			Username: user.Username,
			Email: user.Email,
			Birthday: user.Birthday,
			Favoritemovies: user.Favoritemovies
		});
	}).catch(function(err){
		console.error(err);
		res.status(500).send('Error: ' + error);
	});
});

// DELETE request to remove movie from their listStyleType
/**
 * @function get-users-favorite
 * @param {string} users - get users' profile passing username
 * @param {function} token - passport authentication
 * @param {function}  reqRes - req & res
 * @description - Delete favorite movie from the user's list.
 */
app.delete('/users/:Username/movie/:movie', passport.authenticate('jwt', {session: false}),function(req, res) {
	Users.findOneAndUpdate({Username: req.params.Username},
		{$pull: {Favoritemovies: req.params.movie}},{new: true})
	.then(function(user) {
		res.status(200).json({
			Username: user.Username,
			Email: user.Email,
			Birthday: user.Birthday,
			Favoritemovies: user.Favoritemovies
		})
	}).catch(function(error) {
		console.error(error);
		res.status(500).send('Error: ' + error);
	});
});

// DELETE request to remove movie from their listStyleType
/**
 * @function get-users-favorite
 * @param {string} users - get users' profile passing username
 * @param {function} token - passport authentication
 * @param {function}  reqRes - req & res
 * @description - Deletes user profile.
 */
app.delete('/users/:Username', passport.authenticate('jwt', {session: false}), function(req, res) {
    var unregisteredUser = req.params.Username;
	Users.findOneAndRemove({Username: req.params.Username})
	.then(function(user) {
		res.status(200).send( req.params.Username + ' - your account has been unregistered.');
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
