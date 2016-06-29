var express = require('express');
var path = require('path');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req,res){
res.sendFile(path.resolve('public/views/index.html'));
});

router.post('/',passport.authenticate('local',
{
  successRedirect: '/views/users.html',
  failureRedirect: '/views/failure.html'
})
);
module.exports = router;
