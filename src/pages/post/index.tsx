import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import JobInfoForm from './JobInfoForm';
import Review from './Review';
import { useNotifs } from '@/context';
import Modal from '@mui/material/Modal';
import getCookie from '../../components/csrfToken';
import { useNavigate } from 'react-router-dom';

import {
    jobdataInt, jobdataIntTemplate,
    PersonInfoType
    } from '@/types/interface';

const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
      

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mlabhub.com/">
        mlabhub.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Job information', 'Review'];



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Post() {
    const [activeStep, setActiveStep] = React.useState(0);
    const notifs = useNotifs();
    const navigate = useNavigate();
    //for form 1
    const [info, setInfo] = React.useState<jobdataInt>(jobdataIntTemplate);
    // state variables for modal:
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // check info for labform whether fillin required fields
    //1. check labname not empty
    //2. check department not empty
    //3. check website url not empty and start with https:// or http
    function checkJobFormInfo():number { 
        if (info.intro == "" || info.course.length == 0 || info.lablink == "" || info.course.length == 0 || info.contact == "" || info.title == "")  { 
            return 0;
        }
        const prefixes = ["http://", "https://"];
        if (!prefixes.some(prefix => info.lablink.startsWith(prefix))) { 
            return 1;
        }
        return 2;
    };

    function checkPeopleFormInfo(): number {
        // Check that all names that exist are not empty
        for (const value of Object.values(peopleDict)) {
          if (value.name === "") {
            return 0;
          }
        }
        return 1;
      }

    const handleAddStep = () => {
        if (activeStep == 0) {
            // check lab info
            const res: number = checkJobFormInfo();

            if (res == 0) {
                notifs.addNotif({ severity: 'error', message: 'Please fill in all required info' });
            } else if (res == 1) {
                notifs.addNotif({ severity: 'error', message: 'Url should start with http:// or https://' });
            }
            else {
                notifs.addNotif({ severity: 'success', message: 'Lab Data Saved!' });
                setActiveStep(activeStep + 1);
            }
        } else { 
            
                // add model to check url
                //setActiveStep(activeStep + 1);
            handleOpen();

        }
        
    }
 
   const handleSetInfo = (key: string, value: string) => {
         setInfo((prevInfo) => ({
             ...prevInfo,
             [key]: value,
         }));
   };


   const handleSetInfoid = (key: string, value: number) => {
        setInfo((prevInfo)=>({
            ...prevInfo,
            [key]: value,
        })
        );
   };

   const handleSetInfoArray = (key: string, value: string[]) => {
          setInfo((prevInfo)=>({
            ...prevInfo,
            [key]: value,
          })
          );
   };

    //for form 2
    const [peopleDict, setPeopleDict] = React.useState<{ [key: string]: PersonInfoType }>(
        {
            "1": {
                email: "liyangg@Umich.edu",
                name: "Yang Li"
            }
        }
    );

    
 
      

  function getStepContent(step: number) {
    switch (step) {
        case 0:
                return <JobInfoForm
                            info={info}
                            handleSetInfo={handleSetInfo} 
                            handleSetInfoid={handleSetInfoid}
                            handleSetInfoArray={handleSetInfoArray}
                            />;
        case 1:
            return <><Review
                info={info}
                />
                { BasicModal(info.lablink)}
            </>;
        default:
            throw new Error('Unknown step');
    }
  }

    const handleFinalSubmit = () => { 
        setActiveStep(activeStep + 1);
        
        console.log("I'm currently at the last step to handle final submit");

        fetch('/api/account/csrf_cookie')
          .then(response => response.json())
          .then(data => {
            const csrftoken: (string | null) = getCookie('csrftoken');
            fetch('/api/jobpages/jobCreate', {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken ? csrftoken : "random_token"
              },
              body: JSON.stringify(info),
            }).then(res => {
              if (res.ok) {
                notifs.addNotif({ severity: 'success', message: 'Submission Saved!' });
                navigate('/jobs');
              } else { 
                res.json().then(data =>
                  notifs.addNotif({
                    severity: 'error',
                    message: `Login error: ${data.error}`,
                  }),
                );
              }
            }).catch(console.warn);
          })
          .catch(error => {
            // Handle any errors
            console.error(error);
          });
          
    };
  function BasicModal(url: string) {
    return (
      <div>
        
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Final Check
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Please double check your Lab URL is correct! 
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 1 }}>Click <a href={ url }>here</a></Typography>
            
            <Box sx={{mt: 2}}>
            <Button  onClick={handleClose} variant="outlined">Back</Button>
            <Button variant="contained" onClick={handleFinalSubmit  }>Confirm</Button>
            </Box>
          </Box>
        </Modal>
      </div>
    );
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Post your job info
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for submitting your job info. 
              </Typography>
              <Typography variant="subtitle1">
                Your job is listed in our website!
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                <Button onClick={() => { setActiveStep(activeStep - 1) }} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                                      onClick={handleAddStep}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Post Job Info' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}