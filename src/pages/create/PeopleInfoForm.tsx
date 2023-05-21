import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { PeopleFormProps} from '@/types/interface';
import IconButton from '@mui/material/IconButton';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import Divider from '@mui/material/Divider';



export default function PeopleForm({ peopleDict,  handleUpdatePerson,handleDeletePerson}: PeopleFormProps) {

  
  const handleAddClick = () => {

    const newId: string = String(Object.keys(peopleDict).length + 1);
    // add react element
    handleUpdatePerson(newId, "", "");
    console.log("Object.keys(peopleDict).length: ", Object.keys(peopleDict).length);
  }
  const handleDeleteClick = () => {
    // delete react element
    handleDeletePerson(String(Object.keys(peopleDict).length));

  };

  
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Members
      </Typography>
      <Grid container spacing={3}>
      {Object.entries(peopleDict).map(([id, person]) => (
  <React.Fragment key={id}>
    <Grid item xs={12} md={6}>
      <TextField
        required={id === "1"}
        id={"Name " + id}
        label={"Name " + id}
        fullWidth
        variant="standard"
        value={person.name}
        onChange={(e) => {
          const updatedValue = {
            ...person,
            name: e.target.value
          };
          handleUpdatePerson(id, updatedValue.name, updatedValue.email);
        }}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <TextField
        id={"Email " + id}
        label={"Email " + id}
        fullWidth
        variant="standard"
        required={id === "1"}
        value={person.email}
        onChange={(e) => {
          const updatedValue = {
            ...person,
            email: e.target.value
          };
          handleUpdatePerson(id, updatedValue.name, updatedValue.email);
        }}
      />
    </Grid>
  </React.Fragment>
))}

        <Grid item xs={12} md={6}>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
            {Object.keys(peopleDict).length < 5 && (<IconButton onClick={handleAddClick}>
              <AddCircleRoundedIcon />
            </IconButton>)
            }
            <Divider orientation="vertical" flexItem />
            {Object.keys(peopleDict).length > 1 &&
            (<IconButton onClick={  handleDeleteClick }>
              <RemoveCircleRoundedIcon/>
            </IconButton>)}
        </ButtonGroup>
        </Grid>
      </Grid>

    </React.Fragment>
  );
}