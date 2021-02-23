const express = require('express');
const router = express.Router();
const db = require('../database');
const bcrypt = require('bcryptjs');

router.post('/', 
  function(request, response) {
    if(request.body.username && request.body.password){
      var username = request.body.username;
      var password = request.body.password;
      db.query('SELECT password FROM user_table WHERE username = ?',[username], 
        function(dbError, dbResults) {
          if(dbError){
            response.json(dbError);
          }
          else {
            if (dbResults.length > 0) {
              bcrypt.compare(password,dbResults[0].password, 
                function(err,compareResult) {
                  if(compareResult) {
                    console.log("succes");
                    response.send(true);
                  }
                  else {
                    console.log("wrong password");
                    response.send(false);
                  }			
                  response.end();
                }
              );
            }
            else{
              console.log("user does not exists");
              response.send(false);
            }
          }
          }

      );
    }
    else{
      console.log("Give the username and password");
      response.send(false);
    }
  }
);

module.exports = router;