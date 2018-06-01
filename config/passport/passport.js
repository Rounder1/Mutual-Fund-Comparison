var bCrypt = require('bcrypt-nodejs');


//--------------------------------------------------------------
// initialize the passport-local strategy
// init the user model, which will be passed as an argument
module.exports = function(passport, user) {

    // initialize the passport-local strategy, and the user model
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

    //define our custom strategy with our instance of the LocalStrategy
    passport.use('local-signup', new LocalStrategy(

        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback

        },
        // callback function
        function(req, email, password, done) {

            var generateHash = function(password) {

                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

            };

            // check to see is user already exists
            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {

                if (user)

                {

                    return done(null, false, {
                        message: 'That email is already taken'
                    });

                } else

                {

                    var userPassword = generateHash(password);

                    var data =

                        {
                            email: email,

                            password: userPassword,

                            firstname: req.body.firstname,

                            lastname: req.body.lastname

                        };


                    User.create(data).then(function(newUser, created) {

                        if (!newUser) {

                            return done(null, false);

                        }

                        if (newUser) {

                            return done(null, newUser);

                        }

                    });

                }

            });

        }

    )); // end of passport.use

    //This saves the user id to the session.
    //serialize
    passport.serializeUser(function(user, done) {

        done(null, user.id);

    });

    // deserialize user
    passport.deserializeUser(function(id, done) {

        User.findById(id).then(function(user) {

            if (user) {

                done(null, user.get());

            } else {

                done(user.errors, null);

            }

        });

    });

}