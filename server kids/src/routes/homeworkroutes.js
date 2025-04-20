const express = require('express');
const router = express.Router();
const Homework = require('../models/homeworkModel');

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
router.post('/submit/:id', async (req, res) => {
  const { id } = req.params;
  const { studentId, file } = req.body;

  const homework = await Homework.findById(id);
  homework.submittedBy.push({ studentId, file, submittedAt: new Date() });
  await homework.save();
  res.json(homework);
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

module.exports = router;

// app.use('/api/homework', homeworkRoutes);