const express = require('express');
const router = express.Router();
const course = require('../models/course_model');

router.get('/:id?',
 function(request, response) {
  if (request.params.id) {
    course.getById(request.params.id, function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        console.log(dbResult[0]);
        response.json(dbResult[0]);
      }
    });
  } else {
    course.get(function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        console.log(dbResult);
        response.json(dbResult);
      }
    });
  }
});


router.post('/', 
function(request, response) {
  course.add(request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult.insertId);
    }
  });
});


router.delete('/:id', 
function(request, response) {
  course.delete(request.params.id, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});


router.put('/:id', 
function(request, response) {
  course.update(request.params.id, request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});

module.exports = router;
