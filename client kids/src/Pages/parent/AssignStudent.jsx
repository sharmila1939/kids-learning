import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';

const AssignStudent = () => {
  const [parents, setParents] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedParent, setSelectedParent] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const parentRes = await axios.get('http://localhost:8888/api/parent');
      const studentRes = await axios.get('http://localhost:8888/api/student/getAll');
      setParents(parentRes.data.parents);
      setStudents(studentRes.data.data);
    };
    fetchData();
  }, []);

  const handleAssign = async () => {
    if (!selectedParent || selectedStudents.length === 0) return;
    await axios.put(`http://localhost:8888/api/parent/${selectedParent}/assign-students`, {
      studentIds: selectedStudents,
    });
    alert('Students assigned successfully');
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Assign Students to Parent</Typography>
      <Card sx={{ p: 3, maxWidth: 600, mx: 'auto', borderRadius: 4, boxShadow: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select Parent</InputLabel>
                <Select
                  value={selectedParent}
                  onChange={(e) => setSelectedParent(e.target.value)}
                  label="Select Parent"
                >
                  {parents.map((parent) => (
                    <MenuItem key={parent._id} value={parent._id}>
                      {parent.Firstname} {parent.Lastname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select Students</InputLabel>
                <Select
                  multiple
                  value={selectedStudents}
                  onChange={(e) => setSelectedStudents(e.target.value)}
                  label="Select Students"
                >
                  {students.map((student) => (
                    <MenuItem key={student._id} value={student._id}>
                      {student.Firstname} {student.Lastname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleAssign}
              >
                Assign Students
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AssignStudent;