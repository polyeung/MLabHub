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
import { umichImg, stadiumImg, bbbImg } from '@/assets';
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import { LocationState } from '@/types/interface';
import { UserData } from '@/types/interface';
import { useNotifs } from '@/context';
import getCookie from '@/components/csrfToken';

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
  const [saved, setSaved] = useState<boolean>(isSaved);
  const titleTypographyProps = {
    style: {
      fontWeight: 'bold',
      fontSize: '16px',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  };

  const handleClick = () => { 
    const options: LocationState = {
        state: {
            pathname: String(id)
        }
        };
    navigate('/labpage', options);
    // console.log(options);
  }


  const selectPic = (dep: string) => {
    const picList = [umichImg, stadiumImg, bbbImg ];
    if(dep == "NA"){
      return umichImg;
    }else if(dep == "EECS"){
      return bbbImg;
    }
    return stadiumImg;
  };
  const handleSavedClick = () => { 
    // implement submit logic code
    if (!userData) {
      notifs.addNotif({ severity: 'error', message: 'Please login to save!' });
      return;
    }
    fetch('/api/account/csrf_cookie')
    .then(response => response.json())
      .then(data => {
        const csrftoken: (string | null) = getCookie('csrftoken');
        fetch('/api/account/update_saved_labs',{
                method: 'POST',
                credentials: 'include',
                headers: { 
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken ? csrftoken : "random_token"
              },
                body: JSON.stringify({
                  'lab_id': id,
                }),
                  }).then(res => {
                    if (res.ok) {
                      notifs.addNotif({ severity: 'success', message: 'Successfully Saved!' });
                      setSaved(!saved);
                    } else { 
                      notifs.addNotif({ severity: 'error', message: 'Something went wrong!' });
                    }
        });
      }).catch(error => console.error('Error:', error));
  };
  return (
    <Card sx={{
      width: 350,
      height: 450,
      position: 'relative',
      boxShadow: 4,
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
          <IconButton onClick={handleClick}>
            <MoreVertIcon/>
          </IconButton>
        }
        title={name}
        titleTypographyProps={titleTypographyProps}

        subheader={ dep }
      />
      <CardMedia
        component="img"
        height="200"
        image={selectPic(dep)}
        alt="Lab Image"
        onClick={handleClick}
        sx={{cursor: 'pointer'}}
      />
      <CardContent sx={{cursor: 'pointer'}} onClick={handleClick}>
      {intro.length < 130 ? <Typography variant="body2" color="text.secondary">{intro}</Typography>:
        <Typography variant="body2" color="text.secondary">{intro.substring(0,130) + "  ..."}</Typography>}
      </CardContent>

      <CardActions disableSpacing sx={{ position: 'absolute', bottom: 0 }}>
        <IconButton aria-label="star to save" onClick={ handleSavedClick }>
          {saved? <StarIcon style={{ color: '#eb9834' }}/> : <StarIcon/>}
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