import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Typography, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';

function SubmitHomework() {
  const { id } = useParams();
  const [data, setData] = useState({
    studentId: '',
    file: ''
  });

  const handleChange = e =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    axios.post(`http://localhost:5000/api/homework/submit/${id}`, data).then(() => {
      alert("Homework submitted");
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}
    >
      <Card sx={{ width: 400, p: 3, borderRadius: 4, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Submit Homework
          </Typography>

          <TextField
            name="studentId"
            label="Student ID"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />

          <TextField
            name="file"
            label="File URL or Name"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            sx={{
              mt: 2,
              transition: '0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundColor: '#1976d2'
              }
            }}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default SubmitHomework;
