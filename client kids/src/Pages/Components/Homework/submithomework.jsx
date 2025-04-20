import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent
} from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';

function SubmitHomework() {
  const { id } = useParams();
  const [studentId, setStudentId] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!studentId || !file) {
      alert('Please provide both Student ID and a PDF file');
      return;
    }

    const formData = new FormData();
    formData.append('studentId', studentId);
    formData.append('file', file); // 'file' key should match backend field name

    try {
      await axios.post(`http://localhost:8888/api/homework/submit/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Homework submitted successfully');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Submission failed');
    }
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
            label="Student ID"
            fullWidth
            margin="normal"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />

          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ mt: 2 }}
          >
            Upload PDF
            <input
              type="file"
              hidden
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </Button>

          {file && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected: {file.name}
            </Typography>
          )}

          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            sx={{
              mt: 3,
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
