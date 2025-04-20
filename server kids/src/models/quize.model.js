const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: Number // Index of correct option
});

const quizSchema = new mongoose.Schema({
  title: String,
  questions: [questionSchema],
  createdBy: String
});

module.exports = mongoose.model("Quiz", quizSchema);
