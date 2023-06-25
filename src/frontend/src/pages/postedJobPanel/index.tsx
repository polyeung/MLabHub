import React, { useState, useEffect} from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardHeader, CardActions} from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { LocationState } from '@/types/interface';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import { ScreenContext } from '@/screenContext';
import CardContent from '@mui/material/CardContent';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PendingIcon from '@mui/icons-material/Pending';
import { styled } from '@mui/material/styles';
import { ButtonProps } from '@mui/material/Button';
import { yellow, green} from '@mui/material/colors';

import {
  jobdataInt, jobdataIntTemplate,
  PersonInfoType
} from '@/types/interface';


interface jobCardProps { 
  title: string;
  labname: string;
  jobID: number;
  setJobSelected: (value: number) => any;
  handleOpen: () => any;
};
interface jobModalProps { 
  open: boolean;
  jobID: number;
  item: jobdataInt;
  handleClose: () => any
};


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface jobCardDetailProps { 
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

function JobCardDetail(props: jobCardDetailProps) {
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
          Required Course: {course.join(", ")}
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

function JobModal({ open,jobID, handleClose, item}: jobModalProps) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ mt: "20px" }}>
          <JobCardDetail title={item.title} intro={item.intro} rate={item.rate} labname={item.labname}
            course={item.course} contact={item.contact} lablink={item.lablink} workHoursSelection={item.workhoursselection}
            workModel={item.workmodel} consecutiveSemestersSelect={ item.consecutivesemestersselect }
          />
        </Box>
        
        
      </Modal>
    </div>
  );
};

function JobCard({ title, labname, jobID, handleOpen, setJobSelected}: jobCardProps) {
  const navigate = useNavigate();
  const { isSmallScreen, isMiddleScreen } = React.useContext(ScreenContext);
  

  const handleModelOpen = (jobID: number) => { 
      setJobSelected(jobID);
      handleOpen();
  };




  return (
      <Card sx={{ minWidth: 275, marginBottom: '10px' }}>
      <CardHeader
        action={
          <ButtonGroup size="small" aria-label="small button group" orientation={isSmallScreen ? "vertical" : "horizontal"}>
            { [
            <IconButton aria-label="delete" key={"delete-button" }>
                <DeleteIcon />
            </IconButton>,
            <IconButton aria-label="more" key={"more-button"} onClick={ () => handleModelOpen(jobID) }>
                < MoreHorizIcon/>
            </IconButton>
            ]}
          </ButtonGroup>
        
        }
        title={
            <Typography component={'span'} variant="h6" >
            {title}
          </Typography>
        }
        // TODO: add department subtittle
        subheader={labname}
      />
    </Card>
  );
}
export default function PostedJobPanel() { 
  const [jobData, setJobData] = useState<jobdataInt[]>([]);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => { setOpen(false); setJobSelected(-1); };
  const [jobSelected, setJobSelected] = React.useState<number>(-1);

  useEffect(() => {
    setIsWaiting(true);
      fetch(`/api/jobpages/getPostedJobs`)
          .then(response => response.json())
        .then(data => { setJobData(data); setIsWaiting(false); });
  }, []);

  return (
    <>
    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
          {jobData.map((item, index) => (
              <JobCard
                  key={"job-card" + String(index)}
                  title={item.title} labname={item.labname}
                  handleOpen={handleOpen}
                  jobID={index}
                  setJobSelected={ setJobSelected } />
          ))}
        <JobModal open={open} handleClose={handleClose} jobID={jobSelected} item={ jobSelected ==-1 ?jobdataIntTemplate :jobData[jobSelected]} />
    </Box>
    </>

  );
};