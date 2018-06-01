var exports = module.exports = {}

// this is a controller for the signup function
exports.signup = function(req, res) {

    res.render('signup');

}

// this is a controller for the signin function
exports.signin = function(req, res) {

    res.render('signin');

}

// this is a controller for the dashboard page
exports.dashboard = function(req, res) {

    res.render('dashboard');

}

// this is a controller for the logout function
exports.logout = function(req, res) {

    req.session.destroy(function(err) {

        res.redirect('/');

    });

}