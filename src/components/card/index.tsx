import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import LinkIcon from '@mui/icons-material/Link';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { umichImg } from 'assets';
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import { LocationState } from 'types/interface';
import { Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';


interface labinfoInt { 
    name: string,
    link: string,
    people: string,
    intro: string,
    id: number
};

export default function RecipeReviewCard({ name, link, people, intro, id }: labinfoInt) {
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState<boolean>(false);
    useEffect(() => {
        if (showAlert) {
          const timeoutId = setTimeout(() => {
            setShowAlert(false);
          }, 2000);
    
          return () => clearTimeout(timeoutId);
        }
      }, [showAlert]);
    
    function handleClick() { 
        const options: LocationState = {
            state: {
                pathname: String(id)
            }
            };
        navigate('/labpage', options);
        // console.log(options);
    }
  return (
    <Card sx={{ maxWidth: 345 , height: 450, position: 'relative'}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      AD
          </Avatar>
        }
        action={
            <IconButton
            sx={{ padding: 0 }}
            onClick={handleClick}>
            <MoreVertIcon sx={{ fontSize: 'inherit' }} />
            </IconButton>
        }
        title={
            <Typography variant="h6" >
              {name}
            </Typography>
          }
              // TODO: add department subtittle
        subheader="CSE"
      />
      <CardMedia
        component="img"
        height="194"
        image={ umichImg }
        alt="Lab Image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
                  { intro }
        </Typography>
              
      </CardContent>
      <CardActions disableSpacing sx={{ position: 'absolute', bottom: 0 }}>
              <IconButton aria-label="star to save" onClick={ () => setShowAlert(true)}>
          <StarIcon />
        </IconButton>
        <a href={ link }>
            <IconButton aria-label="link to web page page">
                <LinkIcon/>
            </IconButton>
        </a>
        
      </CardActions>
      {showAlert && (
        <Alert
          severity="success"
          sx={{ position: 'fixed', bottom: 16, left: 16 }}
          onClose={() => setShowAlert(false)}
          icon={<CheckIcon fontSize="inherit" />}
        >
          Saved lab information!
        </Alert>
      )}
    </Card>
  );
}