var jwtSecret = 'your_jwt_secret';
//This has to be the same key used in the JWTStrategy
var jwt = require('jsonwebtoken');

const passport = require('passport');
require('./passport');

function generateJWTToken(user) {
    return jwt.sign(user, jwtSecret, {
        subject: user.Username, // This is the uername encoding in the JWT
        expiresIn: '7d', // This specifies that the token will expire in 7 days
        algorithm: 'HS256' // This is the algorithm used to 'sign' or encode the values of the JWT
    });
}

/* POST login. */
module.exports = (router) => {
    router.post('/login', (req, res) => {
        passport.authenticate('local', {session: false}, (error, user, info) => {
            if (error) {
                return res.status(500).json({
                    message: error
                });
            }
            if (!user) {
                return res.status(401).json({
                    message: 'Username must be at least 4 characters long',
                    user: user
                });
            }
            req.login(user, { session: false}, (error) => {
                if (error) {
                    res.send(error);
                }
                var token = generateJWTToken(user.toJSON());
                return res.json({user, token});
            });
        })(req, res);
    });
}
