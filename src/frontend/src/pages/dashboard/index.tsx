import React, { useState } from 'react';
import { UserData } from '@/types/interface';
import { Box, Typography, IconButton, TextField , Button, Grid} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useNotifs } from '@/context';
import DeleteModal from '@/components/deleteModal';


function dashboard(props: { userData: UserData |  null | undefined; }) { 
    const [localUser, setLocalUser] = useState<UserData | null | undefined>(props.userData ?? {
        email: '', username: '', name: '', created: ''
    });
    const [waiting, setWaiting] = useState<boolean>(false);
    const notifs = useNotifs();

    const [edit, setEdit] = useState<boolean>(false);
    function handleSubmit() {
		setWaiting(true);
		fetch('/api/account/update', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "username": localUser?.username,
                "email": localUser?.email,
                "name": localUser?.name
            }),
		})
			.then(res => {
				if (res.ok) {
					notifs.addNotif({ severity: 'success', message: 'Changes Saved!' });
				} else { 
					res.json().then(data =>
						notifs.addNotif({
							severity: 'error',
							message: `Save error: ${data.error}`,
						}),
					);
				}
				setWaiting(false);
			})
			.catch(console.warn);
	};
  return (
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridTemplateRows="repeat(6, 1fr)"
        gap="20px"
        width="100vw"
        flexDirection={{ xs: 'column', md: 'row' }}

        >
        {/* Top half of the left-hand side */}
        <Box 
          padding={2}
          sx={{
            gridColumn: 'span 6',
            gridRow: 'span 3',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.5)',
            borderTop: '1px solid blue',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '-5px',
              left: '20',
              width: '50%',
              height: '10px',
              backgroundColor: '#00274c',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
              borderBottom: '1px solid #00274c',
            }}
          />
          {/* Real content begin */}
          <Typography variant="h6">Saved Labs</Typography>
        </Box>

        {/* Bottom half of the left-hand side */}
        <Box
          padding={2}
          sx={{
            gridColumn: 'span 6',
            gridRow: 'span 6',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.5)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '-5px',
              left: '20',
              width: '50%',
              height: '10px',
              backgroundColor: '#FFCB02',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
              borderBottom: '1px solid #FFCB02',
            }}
          />
                {/* Real content begin */}
                {edit ?
                <IconButton disabled={ waiting } onClick={() => { handleSubmit();setEdit(!edit) }}><SaveIcon /></IconButton> :
                <IconButton disabled={ waiting } onClick={() =>  setEdit(!edit) }><EditIcon /></IconButton>}
            
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography sx={{fontWeight: 'bold', mr: '15px'}}>Username: </Typography>
                    <Typography>{localUser?.username}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography sx={{fontWeight: 'bold', mr: '15px'}}>Name: </Typography>
                    {!edit ? <Typography>{localUser?.name}</Typography> :
                        <TextField id="standard-basic" value={localUser?.name} variant="outlined"
                            onChange={(e) =>
                            setLocalUser((prevState) => {
                              if (!prevState) {
                                return prevState;
                              }
                              return { ...prevState, name: e.target.value };
                            })
                          } />
                    }
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography sx={{fontWeight: 'bold', mr: '15px'}}>Email: </Typography>
                    {!edit ? <Typography>{localUser?.email}</Typography> :
                        <TextField id="standard-basic" value={localUser?.email} variant="outlined"
                            onChange={(e) =>
                            setLocalUser((prevState) => {
                              if (!prevState) {
                                return prevState;
                              }
                              return { ...prevState, email: e.target.value };
                            })
                          } />
                    }
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography sx={{fontWeight: 'bold', mr: '15px'}}>Created: </Typography>
            <Typography>{localUser?.created ? localUser?.created : ""}</Typography>
                </Box>
                <DeleteModal userData={ props.userData } />
                
                
            </Box>


        { /*Right hand side box */}
        <Box
            padding={2}
            sx={{
                gridColumn: 'span 6',
                gridRow: 'span 3',
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                overflow: 'auto',
                borderRadius: '10px',
                boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.5)',
                position: 'relative'
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '-5px', // add this line to set the distance of the stroke from the top
                    left: '20',
                    width: '50%', // change this value to adjust the length of the stroke
                    height: '10px',
                    backgroundColor: '#FFCB02',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                    borderBottom: '1px solid #FFCB02',
                }}
            />
            { /* Real content begin */}
            <Typography variant="h6">Saved Jobs</Typography>
                
           
            </Box>
      </Box>


    );
}

export default dashboard;
