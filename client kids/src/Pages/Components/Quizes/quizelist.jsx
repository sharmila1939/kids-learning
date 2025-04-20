import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
} from '@mui/material';
import { Link } from 'react-router-dom';

// Default dummy quiz data
const defaultQuizzes = Array.from({ length: 10 }, (_, i) => ({
  _id: `dummy-${i}`,
  title: `Sample Quiz ${i + 1}`,
}));

function QuizList() {
  const [quizzes, setQuizzes] = useState(defaultQuizzes);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/quiz/all')
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setQuizzes(res.data);
        }
      })
      .catch(() => {
        console.warn('Failed to fetch quizzes. Showing default data.');
      });
  }, []);

  return (
    <Container maxWidth="md" style={{ paddingTop: 40 }}>
      <Typography variant="h4" align="center" gutterBottom>
        📝 Available Quizzes
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {quizzes.map((quiz) => (
          <Grid item xs={12} sm={6} md={4} key={quiz._id}>
            <Card
              style={{
                borderRadius: 16,
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              elevation={4}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom align="center">
                  {quiz.title}
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {quiz._id.startsWith('dummy') ? (
                    <Button disabled variant="outlined" size="small">
                      Coming Soon
                    </Button>
                  ) : (
                    <Button
                      component={Link}
                      to={`/quiz/${quiz._id}`}
                      variant="contained"
                      size="small"
                    >
                      Take Quiz
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default QuizList;
