import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { PeopleFormProps } from '@/types/interface';
import IconButton from '@mui/material/IconButton';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import Divider from '@mui/material/Divider';



export default function PeopleForm({ peopleDict,  handleAddPerson, handleDeletePerson, handleGetPerson, handleUpdatePerson}: PeopleFormProps) {
  const [pplList, setPplList] = React.useState([ getPeopleComp('0')]);
  
  const handleAddClick = () => {
    const newId: string = String(pplList.length);
    // add react element
    setPplList((prevContent) => [...prevContent, getPeopleComp(newId)])
    // update peopleDict
  }
  const handleDeleteClick = () => {
    // delete react element
    setPplList((prevContent) => {
      const updatedList = prevContent.slice(0, prevContent.length - 1);
      return updatedList;
    });
    // update peopleDict

  };
  function getPeopleComp(id: string) { 
    return (<>
      <Grid item xs={12} md={6}>
        <TextField
          required
          id={'Name ' + id}
          label={'Name ' + id}
          fullWidth
          variant="standard"
          value={peopleDict[id].name}
          onChange={ (e) => handleUpdatePerson(id, e.target.value,handleGetPerson(id)[1])}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id={'Email ' + id}
          label={'Email ' + id}
          fullWidth
          variant="standard"
          value={peopleDict[id].email}
          onChange={ (e) => handleUpdatePerson(id, handleGetPerson(id)[0],e.target.value)}
        />
        </Grid>
    </>);
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        People Information
      </Typography>
      <Grid container spacing={3}>
        {pplList}
        <Grid item xs={12} md={6}>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <IconButton onClick={ handleAddClick }>
              <AddCircleRoundedIcon/>
            </IconButton>
            <Divider orientation="vertical" flexItem />
            {pplList.length > 1 &&
            (<IconButton onClick={  handleDeleteClick }>
              <RemoveCircleRoundedIcon/>
            </IconButton>)}
            <Button variant='outlined' onClick={() => { console.log(peopleDict); console.log(handleGetPerson('0'))}}>Testing</Button>
        </ButtonGroup>
        </Grid>
      </Grid>

    </React.Fragment>
  );
}