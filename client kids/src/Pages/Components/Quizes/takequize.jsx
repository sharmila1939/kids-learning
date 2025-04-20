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
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';

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
  const [username, setUsername] = useState('');
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8888/api/quiz/${id}`)
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

  useEffect(() => {
    if (quiz) {
      const initialAnswers = Array(quiz.questions.length).fill(null);
      setAnswers(initialAnswers);
    }
  }, [quiz]);

  const handleOptionChange = (value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[current] = parseInt(value);
    setAnswers(updatedAnswers);
    setSelected(parseInt(value));
  };

  const handleNext = () => {
    if (current < quiz.questions.length - 1) {
      setCurrent(current + 1);
      setSelected(answers[current + 1]);
    }
  };

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setSelected(answers[current - 1]);
    }
  };

  const submitQuiz = async () => {
    const finalScore = answers.reduce((acc, answer, idx) => {
      return answer === quiz.questions[idx].correctAnswer ? acc + 1 : acc;
    }, 0);

    try {
      await axios.post('http://localhost:8888/api/quiz/submit-quiz', {
        quizId: id,
        username,
        score: finalScore,
        total: quiz.questions.length,
      });
    } catch (error) {
      console.error('Failed to submit quiz:', error);
    } finally {
      setScore(finalScore);
      setDone(true);
    }
  };

  if (!quiz) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!started) {
    return (
      <Container maxWidth="sm" sx={{ mt: 10 }}>
        <Box
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: 3,
            bgcolor: '#f2f2f2',
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Enter Your Name to Start Quiz
          </Typography>
          <TextField
            fullWidth
            label="Your Name"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            disabled={!username}
            onClick={() => {
              setStarted(true);
              setSelected(answers[0]);
            }}
          >
            Start Quiz
          </Button>
        </Box>
      </Container>
    );
  }

  if (done) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h4" gutterBottom>
          🎉 Quiz Finished!
        </Typography>
        <Typography variant="h6" gutterBottom>
          Thank you, {username}!
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

        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <RadioGroup
            value={selected}
            onChange={(e) => handleOptionChange(e.target.value)}
          >
            {q.options.map((opt, i) => (
              <FormControlLabel
                key={i}
                value={i}
                control={<Radio />}
                label={opt}
                sx={{
                  bgcolor:
                    answers[current] === i
                      ? i === q.correctAnswer
                        ? 'lightgreen'
                        : '#ffcccc'
                      : 'white',
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  mb: 1,
                  boxShadow: 1,
                  transition: 'all 0.2s ease',
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button variant="outlined" disabled={current === 0} onClick={handlePrevious}>
            Previous
          </Button>

          {current < quiz.questions.length - 1 ? (
            <Button
              variant="contained"
              disabled={selected === null}
              onClick={handleNext}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              disabled={selected === null}
              onClick={submitQuiz}
            >
              Submit
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default TakeQuiz;
