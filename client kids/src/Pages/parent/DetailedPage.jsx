import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  LinearProgress,
  Button,
} from "@mui/material";
import jsPDF from "jspdf";
import axios from "axios";
import Parentsidebar from "./sidebar";

const StudentProgress = () => {
  const [progress, setProgress] = useState([]);
  const [studentInfo, setStudentInfo] = useState(null);

  const studentId = JSON.parse(localStorage.getItem("parent"))?._doc?.children[0];

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8888/api/progress/student/${studentId}`
        );
        setProgress(data);
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    const fetchStudentInfo = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8888/api/parent/${studentId}`
        );
        setStudentInfo(data.studentInfo);
      } catch (error) {
        console.error("Error fetching student info:", error);
      }
    };

    if (studentId) {
      fetchProgress();
      fetchStudentInfo();
    }
  }, [studentId]);

  const downloadPDF = (item) => {
    if (!studentInfo) return;

    const doc = new jsPDF();
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 210, 297, "F");

    doc.setFontSize(20);
    doc.setTextColor(30, 30, 60);
    doc.text("Individual Subject Progress", 20, 30);

    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text(`Name: ${studentInfo.Firstname} ${studentInfo.Lastname}`, 20, 50);
    doc.text(`Email: ${studentInfo.Email}`, 20, 60);

    doc.setFontSize(13);
    doc.text(`Subject: ${item.subject}`, 20, 90);
    doc.text(`Progress: ${item.progressPercentage}%`, 20, 100);
    doc.text(
      `Updated At: ${new Date(item.updatedAt).toLocaleString()}`,
      20,
      110
    );
    doc.text("Comments:", 20, 120);
    doc.setFontSize(12);
    doc.text(doc.splitTextToSize(item.comments, 170), 20, 130);

    doc.save(`${item.subject}_Report.pdf`);
  };

  if (!studentInfo)
    return (
      <Box sx={{ ml: "14rem", mt: 8, p: 4 }}>
        <Typography>Loading student info...</Typography>
      </Box>
    );

  return (
    <>
      <Parentsidebar />
      <Box sx={{ ml: "14rem", mt: 8, p: 4 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Student Subject Progress
        </Typography>
        <Grid container spacing={3}>
          {progress.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card sx={{ p: 2, borderRadius: 3, boxShadow: 4 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>
                    {item.subject}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {item.comments}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    mt={1}
                  >
                    Last updated: {new Date(item.updatedAt).toLocaleString()}
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={item.progressPercentage}
                    />
                    <Typography
                      variant="caption"
                      display="block"
                      textAlign="right"
                      mt={0.5}
                    >
                      {item.progressPercentage}%
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    size="small"
                    sx={{ mt: 2 }}
                    onClick={() => downloadPDF(item)}
                  >
                    Export as PDF
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default StudentProgress;
