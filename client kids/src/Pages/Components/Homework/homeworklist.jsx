import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

function HomeworkList() {
  const [homeworks, setHomeworks] = useState([]);

  const defaultHomeworks = Array.from({ length: 10 }, (_, index) => ({
    _id: `default${index + 1}`,
    title: `Sample Homework ${index + 1}`,
    description: `This is a description for sample homework ${index + 1}.`,
    dueDate: new Date(Date.now() + index * 86400000).toISOString(), // adds days
  }));

  useEffect(() => {
    axios.get('http://localhost:5000/api/homework/all')
      .then(res => {
        if (res.data.length === 0) {
          setHomeworks(defaultHomeworks);
        } else {
          setHomeworks(res.data);
        }
      })
      .catch(() => {
        setHomeworks(defaultHomeworks);
      });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4">Homework List</Typography>
      <Button variant="contained" component={Link} to="/create" style={{ marginTop: 10 }}>Create Homework</Button>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        {homeworks.map(hw => (
          <Grid item xs={12} md={4} key={hw._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{hw.title}</Typography>
                <Typography>{hw.description}</Typography>
                <Typography color="textSecondary">Due: {new Date(hw.dueDate).toLocaleDateString()}</Typography>
                <Button component={Link} to={`/submit/${hw._id}`} variant="outlined" style={{ marginTop: 10 }}>Submit</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default HomeworkList;
