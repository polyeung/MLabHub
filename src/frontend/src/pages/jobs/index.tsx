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
  lablink: string,
  workHoursSelection: string,
  workModel: string,
  consecutiveSemestersSelect: string
};
function JobCard(props: jobCardProps) {
  const {
    title,
    course,
    rate,
    contact,
    intro,
    labname,
    lablink,
    workHoursSelection,
    workModel,
    consecutiveSemestersSelect,
  } = props;

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Required Course: {course.length>0 && course.join(", ")}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Hourly Rate: {rate} USD
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Contact: {contact}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Lab Name: {labname}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Lab Introduction:
        </Typography>
        <Typography variant="body2" sx={{ mt: '10px' }}>
          {intro}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Work Hours Requirement: {workHoursSelection}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Work Model: {workModel}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Consecutive Semesters Requirement: {consecutiveSemestersSelect}
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
            <Typography key={ 1} variant="h4">Jobs page welcome!</Typography>
        
            {jobData.map((item, index) => (
              <Box key={index} sx={{ mt: "20px" }}>
                <JobCard key={index} title={item.title} intro={item.intro} rate={item.rate} labname={item.labname}
                  course={item.course} contact={item.contact} lablink={item.lablink} workHoursSelection={item.workhoursselection}
                  workModel={item.workmodel} consecutiveSemestersSelect={ item.consecutivesemestersselect }
                />
              </Box>
            ))}
          </Box>}
        </>
      );
};

export default jobs;

