const express = require('express');
const router = express.Router();
const Quiz = require('../models/quizModel');

// Create a quiz
router.post('/create', async (req, res) => {
  const newQuiz = new Quiz(req.body);
  const saved = await newQuiz.save();
  res.json(saved);
});

// Get all quizzes
router.get('/all', async (req, res) => {
  const quizzes = await Quiz.find();
  res.json(quizzes);
});

// Get single quiz by ID
router.get('/:id', async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  res.json(quiz);
});

module.exports = router;
// app.use('/api/quiz', quizRoutes);