var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var encryptLib = require('../modules/encryption');
var connection = require('../modules/connection');

router.get('/', function(req,res){
  res.sendFile(path.resolve('public/views/register.html'));
});
router.post('/', function(req,res){
console.log('in register post route');
console.log('username:', req.body.username);
console.log('password:', req.body.password);

pg.connect(connection, function(err, client, done){

  var userToSave = {
      username: req.body.username,
      password: encryptLib.encryptPassword(req.body.password)
    };


client.query("INSERT into user_log_ins (username, password) VALUES ($1, $2) RETURNING id",
  [userToSave.username, userToSave.password],
   function(err, result){
     done();

     if (err){
       console.log(err);
       res.sendStatus(500);
     }else{
       console.log(result);
       console.log('success', result.rows[0].id);
       res.redirect('/');
     }
   });
 });
});




module.exports = router;
