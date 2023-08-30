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
import { useNotifs } from '@/context';
import getCookie from '@/components/csrfToken';
import { UserData, parsedNameInt } from '@/types/interface';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';

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
  consecutiveSemestersSelect: string,
  userData: UserData | null | undefined,
  isSaved: boolean,
  jobId: string
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
    userData,
    isSaved,
    jobId
  } = props;
  const [saved, setSaved] = useState<boolean>(isSaved);
  const notifs = useNotifs();
  const handleSavedClick = () => { 
    // implement submit logic code
    if (!userData) {
      notifs.addNotif({ severity: 'error', message: 'Please login to save!' });
      return;
    }
    fetch('/api/account/csrf_cookie')
    .then(response => response.json())
      .then(data => {
        const csrftoken: (string | null) = getCookie('csrftoken');
        fetch('/api/account/update_saved_jobs',{
                method: 'POST',
                credentials: 'include',
                headers: { 
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken ? csrftoken : "random_token"
              },
                body: JSON.stringify({
                  'job_id': jobId,
                }),
                  }).then(res => {
                    if (res.ok) {
                      notifs.addNotif({ severity: 'success', message: 'Successfully Saved!' });
                      setSaved(!saved);
                    } else { 
                      notifs.addNotif({ severity: 'error', message: 'Something went wrong!' });
                    }
        });
      }).catch(error => console.error('Error:', error));
  };

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
          <IconButton aria-label="star to save" onClick={ handleSavedClick } key="star-icon">
          {saved? <StarIcon style={{ color: '#eb9834' }}/> : <StarIcon/>}
        </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
}
interface jobsProps{
  userData: UserData | null | undefined;
};

interface jobDataIntExtend extends jobdataInt{
  isSaved: boolean;
}

function jobs({userData}: jobsProps) { 
    const navigate = useNavigate();
    const [jobData, setJobData] = useState<jobDataIntExtend[]>([]);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
  useEffect(() => {
    setIsWaiting(true);
      fetch(`/api/jobpages/getJobInfo/`)
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
                  workModel={item.workmodel} consecutiveSemestersSelect={ item.consecutivesemestersselect } userData={userData} isSaved={item.isSaved}
                  jobId={item.id.toString()}
                />
              </Box>
            ))}
          </Box>}
        </>
      );
};

export default jobs;

