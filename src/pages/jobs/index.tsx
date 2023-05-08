import React, { useState, useEffect } from 'react';
import { Button, Typography, Box} from '@mui/material';
import JobsContent from './jobsContent';
import LoginPage from 'components/loginTab';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

const jobData = [
  {
    "labid": "1",
    "title": "student software developer",
    "course": "EECS 280, EECS 281",
    "rate": "14",
    "contact": "ly842605942@gmail.com",
    "intro": "this job requires heavy skills of typescript and frontend skills",
    "labname": "Human AI Lab"
  },{
    "labid": "1",
    "title": "student software developer",
    "course": "EECS 280, EECS 281",
    "rate": "14",
    "contact": "ly842605942@gmail.com",
    "intro": "this job requires heavy skills of typescript and frontend skills,this job requires heavy skills of typescript and frontend skills,this job requires heavy skills of typescript and frontend skills, this job requires heavy skills of typescript and frontend skillsthis job requires heavy skills of typescript and frontend skills",
    "labname": "Human AI Lab"
  }, {
    "labid": "1",
    "title": "student software developer",
    "course": "EECS 280, EECS 281",
    "rate": "14",
    "contact": "ly842605942@gmail.com",
    "intro": "this job requires heavy skills of typescript and frontend skills",
    "labname": "Human AI Lab"
  }
];

interface jobCardProps { 
  title: String,
  intro: String,
  rate: String,
  labname: String
}
function JobCard({ title, intro, rate, labname}: jobCardProps) {
  return (
    <Card sx={{ minWidth: 275, }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          { labname}
        </Typography>
        <Typography variant="h5" component="div" >
          { title }
        </Typography>

        <Typography variant="body2" sx={{mt: '10px'}}>
          { intro}
          
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>

    </Card>
  );
}
function jobs() { 
    const navigate = useNavigate();

    return (
      <>
        <Box  sx={{display: 'flex', flexDirection: 'column'}}>
        <Typography variant="h4">Jobs page welcome!</Typography>
        
          {jobData.map((item) => (
            <Box sx={{ mt: "20px"}}>
              <JobCard title={item.title} intro={item.intro} rate={item.rate} labname={ item.labname} />
              </Box>
          ))}
        </Box>
        </>
      );
};

export default jobs;

