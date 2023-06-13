import React, { useState, useEffect } from 'react';
import { Button, Typography, Box} from '@mui/material';
import JobsContent from './jobsContent';
import LoginPage from '@/components/loginTab';
import { jobdataInt } from '@/types/interface';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';

interface jobCardProps { 
  title: string,
  course: string[],
  rate: number,
  contact: string,
  intro: string,
  labname: string,
  lablink: string
};
function JobCard({ title, course, rate, contact, intro, labname, lablink}: jobCardProps) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Required Course: {
            course.map((item, index) =>(
              <span key={index}>
                {item}
                {index !== course.length - 1 && " "} {/* Add a space if it's not the last item */}
              </span>
            ))
          }
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Hourly Rate: {rate} USD
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Contact: {contact}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Lab Introduction:
        </Typography>
        <Typography variant="body2" sx={{ mt: '10px' }}>
          {intro}
        </Typography>
        <CardActions>
          <a href={lablink}>
            <Button size="small">Learn More</Button>
          </a>
        </CardActions>
      </CardContent>
    </Card>
  );
}
function jobs() { 
    const navigate = useNavigate();
    const [jobData, setJobData] = useState<jobdataInt[]>([]);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
  useEffect(() => {
    setIsWaiting(true);
      fetch(`/api/jobpages/getJobInfo`)
          .then(response => response.json())
        .then(data => { setJobData(data); setIsWaiting(false); });
    }, []);

    return (
      <>
        {isWaiting ? <CircularProgress />:
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4">Jobs page welcome!</Typography>
        
            {jobData.map((item) => (
              <Box sx={{ mt: "20px" }}>
                <JobCard title={item.title} intro={item.intro} rate={item.rate} labname={item.labname}
                  course={item.course} contact={item.contact} lablink={item.lablink}
                />
              </Box>
            ))}
          </Box>}
        </>
      );
};

export default jobs;
