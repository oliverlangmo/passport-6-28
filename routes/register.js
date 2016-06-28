var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req,res){
  res.sendFile(path.resolve('public/views/register.html'));
});
router.post('/', function(req,res){
console.log('in register post route');
console.log('username:', req.body.username);
console.log('password:', req.body.password);
res.sendStatus(200);
});




module.exports = router;
