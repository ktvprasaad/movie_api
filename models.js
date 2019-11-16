const mongoose = require('mongoose'); /* To to MongoDB */
const bcrypt = require('bcrypt'); /* To hash password and compare it with the database */

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

userSchema.statics.hashPassword = function(password) {
	return bcrypt.hashSync(password, 10);
}

userSchema.methods.hashPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

var Movie = mongoose.model('Movie', movieSchema);
var User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
