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
import { UserData, parsedNameInt, PicType, LabelType} from '@/types/interface';
import { useNotifs } from '@/context';
import getCookie from '@/components/csrfToken';
import Tooltip from '@mui/material/Tooltip';
import {labelsKey} from '@/assets/index';
import Chip from '@mui/material/Chip';
import ImageSlide from '@/components/imageSlide';

interface labinfoInt { 
    name: string,
    link: string,
    people: string,
    intro: string,
    id: number,
    dep: string,
    isSaved: boolean,
    emails: string,
    userData: UserData | null | undefined,
    picList: PicType[],
    labelList: LabelType[]
};

export default function RecipeReviewCard({ name, link, people, intro, id, userData, dep, emails, isSaved, picList, labelList}: labinfoInt) {
  const navigate = useNavigate();
  const notifs = useNotifs();
  const [saved, setSaved] = useState<boolean>(isSaved);
  const titleTypographyProps = {
    style: {
      fontWeight: 'bold',
      fontSize: '16px',
      overflow: 'hidden',
      whiteSpace: 'normal',  
      textOverflow: 'ellipsis',
      maxHeight: '36px',     
      lineHeight: '18px',    
  },
  };
  function parseSingleName(): parsedNameInt {
    const strList = people.split(',');
    const emailList = emails? emails.split(','): ["N/A"];
    let full_name = "N/A";
    let initial = "N/A"
    if (strList.length > 0){
      let nameSep = strList[0].trim().split(' ');
      full_name = (emailList[0] == 'N/A' || emailList[0] == 'NA') ? strList[0]:strList[0] + " / " + emailList[0];
      initial = nameSep.length == 1 ? String(nameSep[0][0]) : String(nameSep[0][0] + nameSep[1][0]);
    }
    return { name: full_name, initial: initial };
  }
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
  // function chooseRandomThree( ) {
  //   let chosenLabels = [];
  //   let clonedLabels = [...labelsKey]; // Clone the original array to avoid modifying it

  //   for (let i = 0; i < 3; i++) {
  //       const randomIndex = Math.floor(Math.random() * clonedLabels.length);
  //       chosenLabels.push(clonedLabels[randomIndex]);
  //       clonedLabels.splice(randomIndex, 1); // Remove the chosen label to avoid duplicates
  //   }

  //   return chosenLabels;
  // };
  return (
    <Card sx={{
      width: 350,
      height: 500,
      position: 'relative',
      boxShadow: 4,
    }}>
      <CardHeader
        sx={{
          "& .MuiCardHeader-content": {
            overflow: "hidden",
          }
        }}
        avatar={
          <Tooltip title={parseSingleName().name}>
            <Avatar sx={{ width: 40, height: 40, bgcolor: '#F44336' }}>{parseSingleName().initial}</Avatar>
          </Tooltip>
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
      {/* <CardMedia
        component="img"
        height="200"
        image={selectPic(dep)}
        alt="Lab Image"
        onClick={handleClick}
        sx={{cursor: 'pointer'}}
      /> */}
      <CardMedia>
        <ImageSlide picList={picList} />
      </CardMedia>

      <CardContent sx={{cursor: 'pointer'}} onClick={handleClick}>
      {labelList.map((item)=>(
        <Chip label={item.shortname} size="small" key={item.shortname}/>
      ))}
      <Typography style={{fontSize: '11px', marginTop: '10px'}}>
      Lab excels in architecture, circuits, and design research, spanning hardware innovations to sonic attacks on MEMS accelerometers.
      </Typography>
      </CardContent>

      <CardActions disableSpacing sx={{ position: 'absolute', bottom: 0 }}>
        <IconButton aria-label="star to save" onClick={ handleSavedClick } key="star-icon">
          {saved? <StarIcon style={{ color: '#eb9834' }}/> : <StarIcon/>}
        </IconButton>
        <a href={ link }>
          <IconButton aria-label="link to web page page" key="Link-button">
            <LinkIcon/>
          </IconButton>
        </a>
      </CardActions>
      
    </Card>
  );
};