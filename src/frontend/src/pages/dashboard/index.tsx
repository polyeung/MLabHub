import React, { useState } from 'react';
import { UserData } from '@/types/interface';
import { Box, Typography, IconButton, TextField , Button} from '@mui/material';
import { useNotifs } from '@/context';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import BiotechIcon from '@mui/icons-material/Biotech';
import { Hidden } from '@mui/material';
import { ScreenContext } from '@/screenContext';
import WorkIcon from '@mui/icons-material/Work';
import ApprovalIcon from '@mui/icons-material/Approval';
// panel pages start
import LabPanel from '@/pages/labPanel';
import JobPanel from '@/pages/jobPanel';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function dashboard(props: { userData: UserData |  null | undefined; }) { 
    const [waiting, setWaiting] = useState<boolean>(false);
    const notifs = useNotifs();
    const [value, setValue] = React.useState(0);
    const { isSmallScreen, isMiddleScreen } = React.useContext(ScreenContext);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };


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

        
      
       
      <Box sx={{
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.5)',
        borderTop: '1px solid blue',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '20px'}}>
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
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"  variant="fullWidth">
        <Tab icon={<Hidden smDown implementation="css"> <BiotechIcon /></Hidden>} iconPosition="start" label="Saved Labs" {...a11yProps(0)}/>
        <Tab icon={<Hidden smDown implementation="css"> <WorkIcon /></Hidden>} iconPosition="start" label="Saved Jobs" {...a11yProps(1)}/>
        <Tab icon={<Hidden smDown implementation="css"> <ApprovalIcon /></Hidden>} iconPosition="start" label="Posted Labs" {...a11yProps(2)}/>
        <Tab icon={<Hidden smDown implementation="css"> <ApprovalIcon /></Hidden>} iconPosition="start" label="Posted Jobs" {...a11yProps(3)}/>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
            <LabPanel/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        { /*Saved Jobs Box */}
        <JobPanel/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Posted Labs
        </TabPanel>
        <TabPanel value={value} index={3}>
        Posted Jobs
      </TabPanel>
    </Box>
    </Box>
    


    );
}

export default dashboard;
