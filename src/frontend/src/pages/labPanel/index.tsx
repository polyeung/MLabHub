import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardHeader, Stack, Skeleton } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { LocationState } from '@/types/interface';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import { ScreenContext } from '@/screenContext';
import {SimpleLabInfoType} from '@/types/interface';
import CircularProgress from '@mui/material/CircularProgress';
import getCookie from '@/components/csrfToken';
import { useNotifs } from '@/context';

interface labCardProps { 
  name: string,
  dep: string,
  link: string,
  id: number,
  setIsUpdating: (value: boolean) => void,
  isUpdating: boolean
};



function LabCard({ name, dep, link, id, isUpdating, setIsUpdating}: labCardProps) {
  const navigate = useNavigate();
  const notifs = useNotifs();
  const { isSmallScreen, isMiddleScreen } = React.useContext(ScreenContext);
    function handleClick() { 
        const options: LocationState = {
            state: {
                pathname: String(id)
            }
            };
        navigate('/labpage', options);
        // console.log(options);
    }

    const handleSavedClick = () => { 
      // implement submit logic code
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
                        notifs.addNotif({ severity: 'success', message: 'Successfully Removed!' });
                        setIsUpdating(!isUpdating);
                      } else { 
                        notifs.addNotif({ severity: 'error', message: 'Something went wrong!' });
                      }
          });
        }).catch(error => console.error('Error:', error));
    };

    
    const buttons = [
      <IconButton aria-label="delete" key={"delete-button"} onClick={handleSavedClick}>
          <DeleteIcon />
      </IconButton>,
      <IconButton aria-label="delete" key={"more-button"} onClick={ handleClick }>
        < MoreHorizIcon/>
      </IconButton>
    ];


  return (
      <Card sx={{ minWidth: 275, marginBottom: '10px' }} >
      <CardHeader
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
    </Card>
  );
}


export default function labPanel() { 
    const [data, setData] = useState<SimpleLabInfoType[]>([] as SimpleLabInfoType[]);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const [isUpdateing, setIsUpdating] = useState<boolean>(false);

    React.useEffect(() => {
      setIsWaiting(true);
      fetch(`/api/account/get_saved_labs`)
          .then(response => response.json())
        .then(data => { setData(data); setIsWaiting(false); });
    }, [isUpdateing]);

    return (
        <>{isWaiting ?
          <Stack spacing={1} sx={{marginBottom: '20px'}}>
          <Skeleton variant="rounded" sx={{ width: '100%', height: 90 }} />
          <Skeleton variant="rounded" sx={{ width: '100%', height: 90 }} />
          <Skeleton variant="rounded" sx={{ width: '100%', height: 90 }} />
          <Skeleton variant="rounded" sx={{ width: '100%', height: 90 }} />
          <Skeleton variant="rounded" sx={{ width: '100%', height: 90 }} />
          </Stack>:
        data.map((item, index) => (<LabCard key={ "labcard-"+ String(index)}
                                            name={item.name}
                                            dep={item.dep}
                                            id={item.id}
                                            link={item.link}
                                            setIsUpdating={setIsUpdating}
                                            isUpdating={isUpdateing}/>))
    }</>
    );
};