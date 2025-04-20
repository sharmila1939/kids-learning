import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Card,
  CardContent,
  Box,
  Container,
  CircularProgress,
} from '@mui/material';

// Default dummy quiz data
const defaultQuiz = {
  title: 'Sample Quiz',
  questions: [
    {
      question: 'What is the capital of India?',
      options: ['Mumbai', 'Delhi', 'Chennai', 'Kolkata'],
      correctAnswer: 1,
    },
    {
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: 1,
    },
    {
      question: 'Which is the largest ocean?',
      options: ['Atlantic', 'Indian', 'Pacific', 'Arctic'],
      correctAnswer: 2,
    },
  ],
};

function TakeQuiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/quiz/${id}`)
      .then((res) => {
        if (res.data && res.data.questions?.length) {
          setQuiz(res.data);
        } else {
          setQuiz(defaultQuiz);
        }
      })
      .catch(() => {
        console.warn('Failed to fetch quiz. Using default quiz.');
        setQuiz(defaultQuiz);
      });
  }, [id]);

  const handleOptionClick = (i) => {
    const isCorrect = i === quiz.questions[current].correctAnswer;
    if (isCorrect) setScore((prev) => prev + 1);
    setSelected(i);
    setTimeout(() => {
      if (current + 1 < quiz.questions.length) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        setDone(true);
      }
    }, 1000);
  };

  if (!quiz) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (done) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h4" gutterBottom>
          🎉 Quiz Finished!
        </Typography>
        <Typography variant="h6">
          Your Score: {score} / {quiz.questions.length}
        </Typography>
      </Container>
    );
  }

  const q = quiz.questions[current];

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Box
        sx={{
          padding: 3,
          borderRadius: 3,
          boxShadow: 3,
          bgcolor: '#f9f9f9',
        }}
      >
        <Typography variant="h5" gutterBottom align="center">
          🧠 {quiz.title}
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Q{current + 1}: {q.question}
        </Typography>

        <Box mt={2}>
          {q.options.map((opt, i) => (
            <Card
              key={i}
              onClick={() => handleOptionClick(i)}
              sx={{
                mb: 1.5,
                bgcolor:
                  selected === i
                    ? i === q.correctAnswer
                      ? 'lightgreen'
                      : '#ffcccc'
                    : 'white',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.01)',
                  transition: '0.2s',
                },
              }}
            >
              <CardContent>{opt}</CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default TakeQuiz;
