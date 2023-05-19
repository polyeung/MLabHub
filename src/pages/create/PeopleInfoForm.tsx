import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

function getPeopleComp(id: string) { 

  return (<>
    <Grid item xs={12} md={6}>
      <TextField
        required
        id={'Name ' + id}
        label={'Name ' + id}
        fullWidth
        autoComplete="cc-name"
        variant="standard"
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <TextField
        id={'Email ' + id}
        label={'Email ' + id}
        fullWidth
        autoComplete="cc-number"
        variant="standard"
      />
      </Grid>
  </>);
};
export default function PaymentForm() {
  const [pplList, setPplList] = React.useState([ getPeopleComp('0')]);
  
  const handleClick = () => { 
    setPplList((prevContent) => [...prevContent, getPeopleComp(String(prevContent.length))])
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        People Information
      </Typography>
      <Grid container spacing={3}>
        {pplList}
        <Grid item xs={12} md={6}>
          <Button variant='outlined' onClick={handleClick}>Add Person</Button>
        </Grid>
      </Grid>

    </React.Fragment>
  );
}