const mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
	Title: {type: String, required: true},
	Description: {type: String, required: true},
	Genre: {
		Name: String,
		Description: String
	},
	Director: {
		Name: String,
		Bio: String,
		Birth: Date,
		Death: Date
	},
	ImagePath: String,
	Featured: Boolean,
    Actors: [String]
});

var userSchema = mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	emailID: {type: String, required: true},
	birth: Date,
	favoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});


var Movie = mongoose.model('Movie', movieSchema);
var User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
