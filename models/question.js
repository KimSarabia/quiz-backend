"use strict";

var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
  questionTitle: { type: String },
  questionAnswer: { type: String },
  questionSample: { type: String },
  questionCategory: { type: String  },
});

questionSchema.statics.addNewQuestion = (questionObj, cb) => {
    if (!questionObj) res.send('Not proper question format!');
console.log(questionObj);
    var question = new Question({
        questionTitle: questionObj.questionTitle,
        questionAnswer: questionObj.questionAnswer,
        questionSample: questionObj.questionSample,
        questionCategory: questionObj.questionCategory
    });
    question.save(cb);
}

questionSchema.statics.updateQuestion = (questionId, updatedQuestion, cb) => {
    Question.findById(questionId, (err, prev) => {
        if (err) cb(err);
        var question = {
          questionTitle: updatedQuestion.questionTitle,
          questionAnswer: updatedQuestion.questionAnswer,
          questionSample: updatedQuestion.questionSample,
          questionCategory: updatedQuestion.questionCategory
        };

        var currentlyUpdating = {};
        for (var key in question) {
            if (question[key] !== undefined && question[key] !== null) currentlyUpdating[key] = question[key];
        }
        Question.findByIdAndUpdate(questionId, {
            $set: currentlyUpdating
        }, {
            new: true
        }, cb);
    })
}

var Question = mongoose.model('Question', questionSchema);

module.exports = Question;
