import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

export default function TitlebarImageList() {
    const [idx, setIdx] = React.useState(0);
    const urlList = [
        "https://theory.engin.umich.edu/wp-content/uploads/sites/9/2019/08/whiteboard.jpg",
        "	https://guoanhong.com/paperimages/CHI23-VRGit.jpg",
        "https://guoanhong.com/paperimages/CHI23-DIYAT.jpg",
        "https://eecsnews.engin.umich.edu/wp-content/uploads/sites/2/2023/08/new-fac-23-featured-470x312.jpg"
    ];

    const leftClick = () => {
        setIdx((idx - 1 + urlList.length) % urlList.length);
    };

    const rightClick = () => {
        setIdx((idx + 1) % urlList.length);
    };
  return (

        <ImageListItem key={"some key"} sx={{width: '100%'}}>
          <img
            src={urlList[idx]}
            alt={"img"}
            loading="lazy"
          />
         <ImageListItemBar
          sx={{
            background: 'transparent',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
            actionIcon={
                <>
                <IconButton
                sx={{
                  color: 'white',
                  position: 'absolute',
                  top: '50%',
                  left: '0',
                  transform: 'translateY(-50%)',
                  fontSize: '2rem',
                }}
                onClick={leftClick}

                aria-label={`info about ${"labimage"}`}
              >
                <KeyboardArrowLeftIcon fontSize="inherit" />
              </IconButton>

              <IconButton
                sx={{
                  color: 'white',
                  position: 'absolute',
                  top: '50%',
                  right: '0',
                  transform: 'translateY(-50%)',
                  fontSize: '2rem',
                }}
                aria-label={`info about ${"labimage"}`}
                onClick={rightClick}
              >
                <KeyboardArrowRightIcon fontSize="inherit" />
              </IconButton>
              </>
              
            }
          />
        </ImageListItem>

  );
}

