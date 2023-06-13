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

interface labCardProps { 
  name: string,
    dep: string,
};



function LabCard({ name, dep}: labCardProps) {
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
            name
        }
        // TODO: add department subtittle
        subheader={dep}
      />
    </Card>
  );
}


const labData = [
    {
      name: 'AI Lab',
      dep: 'EECS'
    },
    {
      name: 'AI Lab2',
      dep: 'EECS'
    },
    {
      name: 'AI Lab3',
      dep: 'EECS'
    },
    {
      name: 'AI Lab4',
      dep: 'EECS'
    }
  ];
export default function labPanel() { 
    return (
        <>{labData.map((item, index) => (<LabCard key={ "labcard-"+ String(index)} name={item.name} dep={item.dep}/>))
    }</>
    );
};