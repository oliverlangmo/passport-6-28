var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var publicAPI={
  encryptPassword: function(password){
    var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
    return bcrypt.hashSync(password, salt);
  },
  comparePassword: function(){

  }
};
