import React, { useState } from 'react';
import { UserData } from '@/types/interface';
import { Box, Typography, IconButton, TextField , Button} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useNotifs } from '@/context';
import DeleteModal from '@/components/deleteModal';
import LabCard from '@/components/labCard';

const labData = [
  {
    name: 'AI Lab',
    dep: 'EECS'
  },
  {
    name: 'AI Lab',
    dep: 'EECS'
  },
  {
    name: 'AI Lab',
    dep: 'EECS'
  },
  {
    name: 'AI Lab',
    dep: 'EECS'
  }
];

function dashboard(props: { userData: UserData |  null | undefined; }) { 
    const [waiting, setWaiting] = useState<boolean>(false);
    const notifs = useNotifs();



  return (
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%', // Making the box full width
        marginTop: '5px'
      }}

        >
        
        {/* User Profile Box */}
        <Box
          padding={2}
          sx={{
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
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography sx={{fontWeight: 'bold', mr: '15px'}}>Username: </Typography>
                    <Typography>{props.userData?.username}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography sx={{fontWeight: 'bold', mr: '15px'}}>Name: </Typography>
                    <Typography>{props.userData?.name}</Typography> 
                </Box>
        
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography sx={{fontWeight: 'bold', mr: '15px'}}>Email: </Typography>
                    <Typography>{props.userData?.email}</Typography>
                </Box>
            </Box>

        {/* Saved Labs Box */}
        <Box 
          padding={2}
          sx={{
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.5)',
            borderTop: '1px solid blue',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px'
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

        {labData.map((item)=>(<LabCard/>))
        }
        </Box>

      
        { /*Saved Labs Box */}
        <Box
            padding={2}
            sx={{
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                overflow: 'auto',
                borderRadius: '10px',
                boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.5)',
              position: 'relative',
              marginTop: '20px'
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
