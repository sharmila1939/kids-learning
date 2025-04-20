import React, { useState } from 'react';
import { TextField, Button, Typography, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';

function CreateHomework() {
  const [data, setData] = useState({
    title: '',
    description: '',
    dueDate: ''
  });

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    axios.post('http://localhost:5000/api/homework/create', data).then(() => {
      alert("Homework created");
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
            Create Homework
          </Typography>

          <TextField
            name="title"
            label="Title"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />

          <TextField
            name="description"
            label="Description"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />

          <TextField
            name="dueDate"
            label="Due Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              transition: '0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundColor: '#1976d2'
              }
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default CreateHomework;
