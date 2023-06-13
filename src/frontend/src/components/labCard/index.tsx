import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardHeader } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { LocationState } from '@/types/interface';


export default function BasicCard() {
    const navigate = useNavigate();
    function handleClick() { 
        const options: LocationState = {
            state: {
                pathname: "1"
            }
            };
        navigate('/labpage', options);
        // console.log(options);
    }
  return (
    <Card sx={{ minWidth: 275, marginBottom: '10px'}}>
          <CardHeader onClick={ handleClick }
        
        action={
            <Button variant="outlined">-</Button>
        
        }
        title={
          <Typography variant="h6" >
            AI Lab
          </Typography>
        }
        // TODO: add department subtittle
        subheader={ "CSE"}
      />
    </Card>
  );
}