var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var connection = require('../modules/connection');
var pg = require('pg');

passport.serializeUser(function(user, done){
done(null, user.id);
});

passport.deserializeUser(function(id,done){
  console.log('called deserialize');
  pg.connect(connection, function(err, client, pgDone){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    client.query('SELECT * from user_log_ins where id = $1',
  [id], function(err, result){
    pgDone();
    if(result.rows.length >=1){
      console.log(result.rows[0]);
      return passDone(null,result.rows[0]);
    }
    if(err){
      console.log(err);
    }
  });
  });
});

passport.use('local', new LocalStrategy(
  {
    passReqToCallback : true,
    usernameField: "username"
  }, function(req, username, password, passDone){
    console.log('passport calls local strategy');
    pg.connect(connection, function(err, client, pgDone){
      if(err){
        console.log(err);
      }
      client.query('SELECT * FROM user_log_ins WHERE username = $1',
       [username], function(err, result){
         pgDone();
          if(err){
           console.log('err');
           return passDone(null, false);
         }else{
           console.log('result.rows', result.rows);
          if(result.rows.length >= 1){
             var passwordDB = result.rows[0].password;

             if(password === passwordDB){
               console.log('password matches');
               return passDone(null, result.rows[0]);
             }
           }
           console.log('nope');
           return passDone(null, false);
         }

      });
    });
  }
));
module.exports = passport;
