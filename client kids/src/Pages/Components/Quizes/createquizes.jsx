import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid, Paper, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';

function CreateQuiz() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: 0 }]);

  const handleQuestionChange = (i, field, value) => {
    const updated = [...questions];
    if (field === 'question') updated[i].question = value;
    else if (field === 'correctAnswer') updated[i].correctAnswer = parseInt(value);
    else updated[i].options[field] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  };

  const submitQuiz = () => {
    axios.post('http://localhost:5000/api/quiz/create', { title, questions })
      .then(() => alert('🎉 Quiz Created Successfully!'))
      .catch(() => alert('❌ Failed to create quiz.'));
  };

  return (
    <Box p={4} maxWidth="900px" margin="auto">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          🚀 Create an Awesome Quiz
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <TextField
          label="Quiz Title"
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={e => setTitle(e.target.value)}
        />
      </motion.div>

      <Stack spacing={3} mt={3}>
        {questions.map((q, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Paper elevation={4} sx={{ padding: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>Question {i + 1}</Typography>
              <TextField
                label="Enter your question"
                fullWidth
                value={q.question}
                onChange={e => handleQuestionChange(i, 'question', e.target.value)}
                margin="normal"
              />
              <Grid container spacing={2}>
                {q.options.map((opt, j) => (
                  <Grid item xs={12} sm={6} key={j}>
                    <TextField
                      label={`Option ${j + 1}`}
                      fullWidth
                      value={opt}
                      onChange={e => handleQuestionChange(i, j, e.target.value)}
                    />
                  </Grid>
                ))}
              </Grid>
              <TextField
                label="Correct Answer Index (0-3)"
                type="number"
                fullWidth
                margin="normal"
                value={q.correctAnswer}
                onChange={e => handleQuestionChange(i, 'correctAnswer', e.target.value)}
              />
            </Paper>
          </motion.div>
        ))}
      </Stack>

      <Stack direction="row" justifyContent="space-between" mt={4}>
        <Button onClick={addQuestion} variant="outlined" size="large" sx={{ px: 3, py: 1.5 }}>
          ➕ Add Question
        </Button>
        <Button onClick={submitQuiz} variant="contained" size="large" color="primary" sx={{ px: 4, py: 1.5 }}>
          ✅ Submit Quiz
        </Button>
      </Stack>
    </Box>
  );
}

export default CreateQuiz;
