import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { PicType } from '@/types/interface';
import {umichImg} from '@/assets';
import CircularProgress from '@mui/material/CircularProgress';

interface ImgProps{
    picList: PicType[]
};
export default function TitlebarImageList({picList}:ImgProps) {
    const [idx, setIdx] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(true);

    const leftClick = () => {
        setIdx((idx - 1 + picList.length) % picList.length);
    };

    const rightClick = () => {
        setIdx((idx + 1) % picList.length);
    };

    const handleImageLoad = () => {
        setIsLoading(false);
      };
  return (

        <ImageListItem key={"some key"} sx={{width: '100%'}}>
            {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <CircularProgress color="inherit" />
        </div>
      ) : null}

          <img
            src={picList.length == 0 ? umichImg :picList[idx].url}
            alt={"img"}
            loading="lazy"
            onLoad={handleImageLoad}
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
                {picList.length != 0 &&
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
              </IconButton>}
                {picList.length != 0 &&
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
              </IconButton>}
              </>}
              
            
          />
        </ImageListItem>

  );
}

