import * as React from 'react';
import {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import { RichLabInfoType, RichLabInfoTemplate } from '@/types/interface';
import { JobFormProps } from '@/types/interface';

export default function JobInfoForm({ info, handleSetInfo, handleSetInfoid}: JobFormProps) {

  const handleChange = (event: (Event&{target:{value:1,name:"default name"}})) => {
    const selectedValue = event.target.value;
    const selectedItem = labinfo.find(item => item.id === selectedValue);
    handleSetInfo('labname', selectedItem?.name as string);
    handleSetInfo('lablink', selectedItem?.link as string);
    handleSetInfoid('labid', selectedItem?.id as number);
  };

  const handleChangeRateType = (event: SelectChangeEvent) =>{
    if (event.target.value === "Credit") {
      
      handleSetInfo('rate_type', "Credit");
      handleSetInfoid('rate', null);
    }else{
      handleSetInfo('rate_type', "Number");
    }
  };

  const [labinfo, setLabinfo] = useState<RichLabInfoType[]>([]);

  useEffect(() => {
    fetch(`/api/getLabInfo`)
        .then(response => response.json())
        .then(data =>  setLabinfo(data));
  }, []);

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Rate Type *</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={info.rate_type}
                label="Rate type"
                onChange={handleChangeRateType}
              > 
                <MenuItem value={"Credit"}>Credit</MenuItem>
                <MenuItem value={"Number"}>Hourly Rate</MenuItem>
              </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Lab *</InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={info.labid}
              label="Lab"
              onChange={handleChange}
            > 
              {
                labinfo.map((item) =>(
                  <MenuItem value={Number(item.id)}>{item.name}</MenuItem>
                )
                
                )
              }
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
              required
              id="jobtitle"
              name="jobtitle"
              label="Job Title"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={info.title}
              onChange={(e) => { handleSetInfo('title', e.target.value)}}
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            required
            id="course"
            name="course"
            label="Required Course"
            fullWidth
            variant="standard"
            value={info.course}
            onChange={(e) => { handleSetInfo('course', e.target.value)}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="rate"
            name="rate"
            label="Hourly Rate"
            fullWidth
            variant="standard"
            value={info.rate}
            
            onChange={(e) => { handleSetInfoid('rate', parseInt(e.target.value || '0'))}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="contact"
            name="contact"
            label="Contact Email"
            fullWidth
            variant="standard"
            value={info.contact}
            onChange={(e) => { handleSetInfo('contact', e.target.value)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="intro"
            name="intro"
            label="Introduction to this job position"
            fullWidth
            variant="standard"
            value={info.intro}
            onChange={(e) => { handleSetInfo('intro', e.target.value)}}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}