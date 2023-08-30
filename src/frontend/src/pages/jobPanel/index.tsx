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
import getCookie from '@/components/csrfToken';
import { useNotifs } from '@/context';

interface jobCardProps { 
    name: string;
    dep: string;
    jobID: string;
    setJobSelected: (value: string) => any;
    handleOpen: () => any;
    setIsUpdating: (value: boolean) => void,
    isUpdating: boolean
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



function JobCard({ name, dep, jobID, isUpdating, setIsUpdating}: jobCardProps) {
  const navigate = useNavigate();
    const { isSmallScreen, isMiddleScreen } = React.useContext(ScreenContext);
    const notifs = useNotifs();



    const handleSavedClick = () => { 
      // implement submit logic code
      setIsUpdating(true);
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
                    'job_id': jobID,
                  }),
                    }).then(res => {
                      if (res.ok) {
                        notifs.addNotif({ severity: 'success', message: 'Successfully Saved!' });
                        setIsUpdating(false);
                      } else { 
                        notifs.addNotif({ severity: 'error', message: 'Something went wrong!' });
                      }
          });
        }).catch(error => console.error('Error:', error));
    };



  return (
      <Card sx={{ minWidth: 275, marginBottom: '10px' }}>
      <CardHeader
        action={
          <ButtonGroup size="small" aria-label="small button group" orientation={isSmallScreen ? "vertical" : "horizontal"}>
            { [
            <IconButton aria-label="delete" key={"delete-button"} onClick={handleSavedClick}>
                <DeleteIcon />
            </IconButton>,
            <IconButton aria-label="more" key={"more-button"}>
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
                    jobID={String(item.id)}
                    setJobSelected={ setJobSelected }
                    isUpdating={isUpdateing}
                    setIsUpdating={setIsUpdating}/>
            ))}
            {(!isWaiting && data.length == 0) && <Typography sx={{mt: 1}}>
                        🥺 Oops! No labs found</Typography>}
        </>
    );
};