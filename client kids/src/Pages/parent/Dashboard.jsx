import React from "react";
import { Card, CardContent, Typography, Avatar, Grid, Box, LinearProgress, Chip, Divider } from "@mui/material";
import Parentsidebar from "./sidebar";

const ParentStudentDashboard = ({ studentInfo, progress }) => {
  return (
    <>
   
    <Box sx={{ p: 4, background: 'linear-gradient(to right, #e0eafc, #cfdef3)', minHeight: '100vh' }}>
      <Box maxWidth="md" mx="auto">
        <Card sx={{ p: 4, mb: 4, borderRadius: 4, boxShadow: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar sx={{ width: 64, height: 64 }}>
                {studentInfo.Firstname[0]}{studentInfo.Lastname[0]}
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h5" fontWeight={600}>
                {studentInfo.Firstname} {studentInfo.Lastname}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {studentInfo.Email}
              </Typography>
              <Chip label={`Status: ${studentInfo.Isapproved}`} variant="outlined" sx={{ mt: 1 }} />
            </Grid>
          </Grid>
        </Card>

        <Typography variant="h6" gutterBottom>
          Subject Progress
        </Typography>

        <Grid container spacing={3}>
          {progress.map((item) => (
            <Grid item xs={12} sm={6} key={item._id}>
              <Card sx={{ p: 2, borderRadius: 3, boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={500}>
                    {item.subject}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {item.comments}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <LinearProgress variant="determinate" value={item.progressPercentage} />
                    <Typography variant="caption" display="block" textAlign="right">
                      {item.progressPercentage}%
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
    </>
   
  );
};

export default ParentStudentDashboard;
