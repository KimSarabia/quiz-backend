var express = require('express');
var router = express.Router();
var Question = require('../models/question');
var request = require('request');

router.get('/', (req, res) => {
  Question.find({}, (err, questions) => {
    return err ? res.status(400).send(err) : res.send(questions);
  });
});

router.post('/', (req, res) => {
  Question.addNewQuestion(req.body, (err, question) => {
    res.status(err ? 400 : 200).send(err || question);
  });
});

router.get('/:id', (req, res) => {
  Question.findById(req.params.id, (err, question) => {
    res.status(err ? 400 : 200).send(err || question);
  });
});

router.put('/:id', (req, res) => {
  Question.updateQuestion(req.params.id, req.body, (err, updatedQuestion) => {
    res.status(err ? 400 : 200).send(err || updatedQuestion);
  });
});

router.delete('/:id', (req, res) => {
  Question.findById(req.params.id, (err, question) => {
    Question.findByIdAndRemove(req.params.id, (err) => {
      res.status(err ? 400 : 200).send(err || `${req.params.id} deleted!`);
    });
  });
});


module.exports = router;
