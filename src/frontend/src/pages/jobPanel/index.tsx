import React, { useState } from 'react';

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

interface jobCardProps { 
  name: string,
    dep: string,
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

function JobModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

function JobCard({ name, dep}: jobCardProps) {
  const navigate = useNavigate();
  const { isSmallScreen, isMiddleScreen } = React.useContext(ScreenContext);
    function handleClick() { 
        const options: LocationState = {
            state: {
                pathname: "1"
            }
            };
        navigate('/labpage', options);
        // console.log(options);
    }

    const buttons = [
      <IconButton aria-label="delete" key={"delete-button" }>
          <DeleteIcon />
      </IconButton>,
      <IconButton aria-label="delete" key={"more-button"} onClick={ handleClick }>
        < MoreHorizIcon/>
      </IconButton>
    ];

  return (
      <Card sx={{ minWidth: 275, marginBottom: '10px' }}>
      <CardHeader onClick={handleClick}
        
        action={
          <ButtonGroup size="small" aria-label="small button group" orientation={isSmallScreen ? "vertical" : "horizontal"}>
            {buttons}
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


const labData = [
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
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
            {labData.map((item, index) => (<JobCard key={ "job-card"+ String(index) } name={item.name} dep={item.dep} />))}
            <JobModal />
        </Box>
    );
};