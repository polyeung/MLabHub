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
import LabInfoForm from './LabInfoForm';
import PeopleInfoForm from './PeopleInfoForm';
import Review from './Review';
import {
    LabInfoTypeForm, LabInfoTypeFormTemplate,
    AddrInfoType, AddrInfoTemplate, PersonInfoType,
    } from '@/types/interface';

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

const steps = ['Lab information', 'Members information', 'Review'];



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function CreateLabForm() {
    const [activeStep, setActiveStep] = React.useState(0);
    //for form 1
    const [info, setInfo] = React.useState<LabInfoTypeForm>(LabInfoTypeFormTemplate);
    const [addr, setAddr] = React.useState<AddrInfoType>(AddrInfoTemplate);
    const handleSetAddr = (key: string, value: string) => {
        setAddr((prevInfo) => ({
             ...prevInfo,
             [key]: value,
         }));
     };
 
   const handleSetInfo = (key: string, value: string) => {
         setInfo((prevInfo) => ({
             ...prevInfo,
             [key]: value,
         }));
   };
    //for form 2
    const [peopleDict, setPeopleDict] = React.useState<{ [key: string]: PersonInfoType }>(
        {
            "1": {
                email: "",
                name: ""
            }
        }
    );
    


     const handleUpdatePerson= (id: string, name: string, email: string): void => {
        setPeopleDict((prevPeopleDict) => {
            return {
              ...prevPeopleDict,
              [id]: {
                name: name,
                email: email,
              },
            };
          });
     };
     const handleDeletePerson = (id: string): void => {
        setPeopleDict((prevPeopleDict) => {
          const updatedPeopleDict = { ...prevPeopleDict };
          delete updatedPeopleDict[id];
          return updatedPeopleDict;
        });
      };
      

  function getStepContent(step: number) {
    switch (step) {
      case 0:
            return <LabInfoForm
                        info={info}
                        addr={addr}
                        handleSetAddr={handleSetAddr}
                        handleSetInfo={handleSetInfo} />;
      case 1:
            return <PeopleInfoForm
                peopleDict={peopleDict}
                handleUpdatePerson={handleUpdatePerson}
                handleDeletePerson={ handleDeletePerson}
            />;
      case 2:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }
    
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Post your lab info
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
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
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
                                      onClick={() => { setActiveStep(activeStep + 1); console.log(info); console.log(addr); console.log(peopleDict); }}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
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