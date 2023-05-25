import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import { LabFormProps } from '@/types/interface';
import { depList } from '@/assets';

export default function LabInfoForm({ info, handleSetInfo}: LabFormProps) {

  const handleChange = (event: SelectChangeEvent) => {
    handleSetInfo('dep',event.target.value as string);
  };

  

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="labName"
            name="labName"
            label="Lab Name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={info.name}
            onChange={(e) => { handleSetInfo('name', e.target.value)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="number"
            id="funding"
            name="funding"
            label="Lab Funding"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            InputProps={{
              startAdornment: <InputAdornment position="start">$USD</InputAdornment>,
            }}
            value={info.funding}
            onChange={(e) => { handleSetInfo('funding', e.target.value)}}
          />
        </Grid>
        <Grid item xs={12}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Department *</InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={info.dep}
              label="Department"
              onChange={handleChange}
            > 
              {depList.map((item:string[]) => (
                <MenuItem value={item[0]}>{ item[0] + ' ' + item[1] }</MenuItem>
              ))

              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="link"
            name="link"
            label="Website URL"
            fullWidth
            variant="standard"
            value={info.link}
            onChange={(e) => { handleSetInfo('link', e.target.value)}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="outlined-textarea"
            label="Introduction of your lab"
            placeholder="type..."
            required
            multiline
            rows={4}
            maxRows={6}
            inputProps={{ maxLength: 395 }}
            variant="filled"
            value={info.intro}
            onChange={(e) => { handleSetInfo("intro", e.target.value)}}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}