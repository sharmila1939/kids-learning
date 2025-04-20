import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@mui/material";
import { Typography, Button, Box } from "@mui/material";
import { FaDownload } from "react-icons/fa";


const HomeworkSubmissions = () => {
  const [homeworks, setHomeworks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8888/api/homework/all")
      .then((response) => {
        setHomeworks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching homework:", error);
      });
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Submitted Homework</Typography>

      {homeworks.map((hw) => (
        <Card key={hw._id} sx={{ mb: 3, p: 2 }}>
          <CardContent>
            <Typography variant="h6">{hw.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              Due Date: {new Date(hw.dueDate).toLocaleDateString()}
            </Typography>

            {hw.submittedBy.length > 0 ? (
              hw.submittedBy.map((submission) => (
                <Box key={submission._id} mt={2} display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="body1">
                    Student ID: {submission.studentId}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<FaDownload/>}
                    href={`http://localhost:8888/public/${submission.file}`}    
                    target="_blank"
                    download
                  >
                    Download File
                  </Button>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No submissions yet.
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default HomeworkSubmissions;
