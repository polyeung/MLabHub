import * as React from 'react';
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
  dep: string
};



export default function BasicCard({ name, dep}: labCardProps) {
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
      <IconButton aria-label="delete" key="delete-button">
          <DeleteIcon />
      </IconButton>,
      <IconButton aria-label="delete" key="delete-button" onClick={ handleClick }>
        < MoreHorizIcon/>
      </IconButton>
    ];

  return (
    <Card sx={{ minWidth: 275, marginBottom: '10px'}}>
        <CardHeader onClick={ handleClick }
        
        action={
          <ButtonGroup size="small" aria-label="small button group">
          {buttons}
        </ButtonGroup>
        
        }
        title={
          <Typography variant="h6" >
            { isSmallScreen? "small screen!":name}
          </Typography>
        }
        // TODO: add department subtittle
        subheader={ isMiddleScreen? "middle screen!":dep }
      />
    </Card>
  );
}