var express = require('express');
var pg = require('pg');
var bodyParser = require('body-parser');

var app = express();

//router requirement
var index = require('../routes/index');
var register = require('../routes/register');
app.use('/register', register);
app.use('/*', index);

app.use(express.static('public'));

app.listen(3000, function(){
console.log('server is listening on 3000');
});
