import React, { useState } from 'react';
import { SimpleJobInfoType} from '@/types/interface';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardHeader } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { LocationState } from '@/types/interface';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import { ScreenContext } from '@/screenContext';
import Modal from '@mui/material/Modal';
import PlaceHolder from '@/pages/labPanel/placeHolder';

interface jobCardProps { 
    name: string;
    dep: string;
    jobID: string;
    setJobSelected: (value: string) => any;
    handleOpen: () => any;
};
interface jobModalProps { 
    open: boolean;
    jobID: string;
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



function JobCard({ name, dep, jobID, handleOpen, setJobSelected}: jobCardProps) {
  const navigate = useNavigate();
    const { isSmallScreen, isMiddleScreen } = React.useContext(ScreenContext);
    

    const handleModelOpen = (jobID: string) => { 
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
            {name}
          </Typography>
        }
        // TODO: add department subtittle
        subheader={dep}
      />
    </Card>
  );
}


const jobData = [
    {
      name: 'Machine Learning Researcher',
      dep: 'EECS'
    },
    {
      name: 'Student Programmer',
      dep: 'EECS'
    },
    {
      name: 'Web Designer',
      dep: 'EECS'
    },
    {
      name: 'Devop Engineer',
      dep: 'EECS'
    }
  ];
export default function labPanel() { 
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false); setJobSelected("-1"); };
    const [jobSelected, setJobSelected] = React.useState<string>("-1");
    const [data, setData] = React.useState<SimpleJobInfoType[]>([] as SimpleJobInfoType[]);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const [isUpdateing, setIsUpdating] = useState<boolean>(false);

    React.useEffect(() => {
      setIsWaiting(true);
      fetch(`/api/account/get_saved_jobs`)
          .then(response => response.json())
        .then(data => { setData(data); setIsWaiting(false); });
    }, [isUpdateing]);
    
    return (
        <>
            {isWaiting? <PlaceHolder />:data.map((item, index) => (
                <JobCard
                    key={"job-card" + String(index)}
                    name={item.title} dep={item.labname}
                    handleOpen={handleOpen}
                    jobID={String(index)}
                    setJobSelected={ setJobSelected } />
            ))}
        </>
    );
};