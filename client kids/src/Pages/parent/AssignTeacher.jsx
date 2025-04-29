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

const AssignTeacher = () => {
  const [parents, setParents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedParent, setSelectedParent] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const parentRes = await axios.get('http://localhost:8888/api/parent');
      const teacherRes = await axios.get('http://localhost:8888/api/teacher/getAll');
      setParents(parentRes.data.parents);
      setTeachers(teacherRes.data.data);
    };
    fetchData();
  }, []);

  const handleAssign = async () => {
    if (!selectedParent || !selectedTeacher) return;

    await axios.put(`http://localhost:8888/api/parent/${selectedParent}/assign-teacher`, {
      teacherId: selectedTeacher,
    });

    alert('Teacher assigned successfully');
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Assign Teacher to Parent</Typography>
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
                <InputLabel>Select Teacher</InputLabel>
                <Select
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                  label="Select Teacher"
                >
                  {teachers.map((teacher) => (
                    <MenuItem key={teacher._id} value={teacher._id}>
                      {teacher.Firstname} {teacher.Lastname}
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
                Assign Teacher
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AssignTeacher;
