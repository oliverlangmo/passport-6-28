var express = require('express');
var pg = require('pg');
var bodyParser = require('body-parser');
var app = express();
var passport = require('../strategies/user-local.js');
var session = require('express-session');
//init passport
app.use(passport.initialize());
app.use(passport.session());



app.use(bodyParser.urlencoded({extended: true}));
//router requirement
var index = require('../routes/index');
var register = require('../routes/register');
app.use(express.static('public'));
app.use('/register', register);
app.use('/*', index);


app.use(session({
secret: 'secret',
key:'user',
resave:'true',
saveUninitialized: false,
cookie: {maxage: 60000, secure: false}
}));
app.listen(3000, function(){
console.log('server is listening on 3000');
});
