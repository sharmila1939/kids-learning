import express from 'express';
import Quiz from '../models/quize.model.js';
import QuizSubmission  from '../models/submissions.js';

const router = express.Router();

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



router.post('/submit-quiz', async (req, res) => {

  try {
    const { quizId, username, score, total } = req.body;

    if (!quizId || !username || score === undefined || !total) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const submission = new QuizSubmission({
      quizId,
      username,
      score,
      total,
    });

    await submission.save();

    res.status(201).json({ message: 'Quiz submitted successfully', submission });
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({ message: 'Server error while submitting quiz' });
  }
 
});




export default router;
