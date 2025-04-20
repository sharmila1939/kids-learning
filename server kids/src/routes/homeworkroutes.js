import express from 'express';
import Homework from '../models/homework.js';
import { upload } from '../middlewares/multer.middleware.js';
import QuizSubmission  from '../models/submissions.js';

const router = express.Router();

// Create homework
router.post('/create', async (req, res) => {
  const newHomework = new Homework(req.body);
  const saved = await newHomework.save();
  res.json(saved);
});

// Get all homework
router.get('/all', async (req, res) => {
  const all = await Homework.find();
  res.json(all);
});

// Submit homework
router.post('/submit/:id', upload.single('file'), async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId } = req.body;
    const file = req.file;

    if (!studentId || !file) {
      return res.status(400).json({ message: 'Student ID and file are required' });
    }

    const homework = await Homework.findById(id);
    if (!homework) {
      return res.status(404).json({ message: 'Homework not found' });
    }

    homework.submittedBy.push({
      studentId,
      file: file.filename, // or use file.path if you need full path
      submittedAt: new Date()
    });

    await homework.save();
    res.json({ message: 'Homework submitted successfully', homework });
  } catch (error) {
    console.error('Submit Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Add feedback
router.post('/feedback/:id', async (req, res) => {
  const { id } = req.params;
  const { studentId, feedback, grade } = req.body;

  const homework = await Homework.findById(id);
  const submission = homework.submittedBy.find(s => s.studentId === studentId);
  if (submission) {
    submission.feedback = feedback;
    submission.grade = grade;
  }
  await homework.save();
  res.json(homework);
});

// Get all quiz submissions
router.get('/submissions', async (req, res) => {
  try {
    const submissions = await QuizSubmission.find();
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Error fetching quiz submissions:', error);
    res.status(500).json({ message: 'Server error while fetching submissions' });
  }
});


export default router;
