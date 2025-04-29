import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions
} from '@mui/material';

const AddProgressModal = () => {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(null);
  const [subject, setSubject] = useState('');
  const [progressPercentage, setProgressPercentage] = useState('');
  const [comments, setComments] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8888/api/student/getAll')
      .then(res => setStudents(res.data.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (studentId) => {
    try {
      await axios.post('http://localhost:8888/api/progress/add', {
        studentId,
        subject,
        progressPercentage: parseInt(progressPercentage),
        comments,
      });
      alert('Progress added successfully!');
      setOpen(null);
      setSubject('');
      setProgressPercentage('');
      setComments('');
    } catch (error) {
      console.error('Error adding progress:', error);
      alert('Failed to add progress.');
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Students</Typography>
      <Grid container spacing={3}>
        {students.map((student) => (
          <Grid item xs={12} md={6} lg={4} key={student._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{student.Firstname} {student.Lastname}</Typography>
                <Typography color="textSecondary">{student.Email}</Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" onClick={() => setOpen(student._id)}>Add Progress</Button>
              </CardActions>
            </Card>

            <Dialog open={open === student._id} onClose={() => setOpen(null)}>
              <DialogTitle>Add Progress for {student.Firstname}</DialogTitle>
              <DialogContent>
                <TextField
                  fullWidth
                  margin="dense"
                  label="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  label="Progress Percentage"
                  type="number"
                  value={progressPercentage}
                  onChange={(e) => setProgressPercentage(e.target.value)}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  label="Comments"
                  multiline
                  rows={3}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(null)} color="secondary">Cancel</Button>
                <Button onClick={() => handleSubmit(student._id)} color="primary" variant="contained">Submit</Button>
              </DialogActions>
            </Dialog>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AddProgressModal;
