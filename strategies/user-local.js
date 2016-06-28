var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var connection = require('../modules/connection');

passport.use('local', new LocalStrategy(
  {
    passReqToCallback : true,
    usernameField: "username"
  }, function(req, username, password, passDone){
    console.log('passport calls local strategy');
  }
));
module.exports = passport;
