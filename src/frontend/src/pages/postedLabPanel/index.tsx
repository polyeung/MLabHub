import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardHeader, CardActions} from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { LocationState } from '@/types/interface';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import { ScreenContext } from '@/screenContext';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PendingIcon from '@mui/icons-material/Pending';
import { styled } from '@mui/material/styles';
import { ButtonProps } from '@mui/material/Button';
import { yellow } from '@mui/material/colors';

interface labCardProps { 
    name: string,
    dep: string,
    isPending: boolean
};

const WarningButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: 'text.primary',
  backgroundColor: yellow[700],
  '&:hover': {
    backgroundColor: yellow[900],
    },
}));


function LabCard({ name, dep, isPending}: labCardProps) {
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
      <IconButton aria-label="delete" key={"delete-button"}>
          <DeleteIcon />
      </IconButton>,
      <IconButton aria-label="delete" key={"more-button"} onClick={ handleClick }>
        < MoreHorizIcon/>
      </IconButton>
    ];

  return (
      <Card sx={{ minWidth: 275, marginBottom: '10px' }} >
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
          <CardActions>
              {isPending ?<WarningButton startIcon={<PendingIcon />} variant="contained" size="small">Pending</WarningButton>
                  :<Button startIcon={<CheckBoxIcon />} variant="contained" size="small" color="success">Posted</Button>
              }
          </CardActions>
    </Card>
  );
}


const labData = [
    {
      name: 'AI Lab',
      dep: 'EECS',
      isPending: true
    },
    {
      name: 'AI Lab2',
        dep: 'EECS',
        isPending: false
    },
    {
      name: 'AI Lab3',
        dep: 'EECS',
        isPending: true
    },
    {
      name: 'AI Lab4',
        dep: 'EECS',
        isPending: false
    }
  ];
export default function postedLabPanel() { 
    return (
        <>{labData.map((item, index) => (
            <LabCard
                key={"labcard-" + String(index)}
                name={item.name}
                dep={item.dep}
                isPending={item.isPending} />))
            }</>
    );
};