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
import { umichImg } from '@/assets';
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import { LocationState } from '@/types/interface';
import { UserData } from '@/types/interface';
import { useNotifs } from '@/context';
import ExpandableText from '@/components/expandableText';

interface labinfoInt { 
    name: string,
    link: string,
    people: string,
    intro: string,
    id: number,
    dep: string,
    isSaved: boolean,
    userData: UserData | null | undefined;
};

export default function RecipeReviewCard({ name, link, people, intro, id, userData, dep, isSaved}: labinfoInt) {
  const navigate = useNavigate();
  const notifs = useNotifs();

  const titleTypographyProps = {
    style: {
      fontWeight: 'bold',
      fontSize: '16px',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  };
    
  function handleStarClick() {
    if (!userData) {
      notifs.addNotif({ severity: 'error', message: 'Please login to save!' });
    } else {
      notifs.addNotif({ severity: 'success', message: 'Successfully saved!' });
    }
  };

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
    <Card sx={{
      width: 350,
      height: 450,
      position: 'relative',
      border: "1px solid black"
    }}>
      <CardHeader
        sx={{
          "& .MuiCardHeader-content": {
            overflow: "hidden"
          }
        }}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            AD
          </Avatar>
        }
        action={
          <IconButton>
            <MoreVertIcon/>
          </IconButton>
        }
        title={name}
        titleTypographyProps={titleTypographyProps}
        // TODO: add department subtittle
        subheader={ dep }
      />
      <CardMedia
        component="img"
        height="200"
        image={umichImg}
        alt="Lab Image"
        onClick={handleClick}
        sx={{cursor: 'pointer'}}
      />
      <CardContent onClick={handleClick} sx={{cursor: 'pointer'}}>
        <ExpandableText dialogTitle={name} text={intro} maxLines={3} ></ExpandableText>
      </CardContent>

      <CardActions disableSpacing sx={{ position: 'absolute', bottom: 0 }}>
        <IconButton aria-label="star to save" onClick={ handleStarClick }>
          {isSaved? <StarIcon style={{ color: '#eb9834' }}/> : <StarIcon/>}
        </IconButton>
        <a href={ link }>
          <IconButton aria-label="link to web page page">
            <LinkIcon/>
          </IconButton>
        </a>
      </CardActions>
      
    </Card>
  );
};