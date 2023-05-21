import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import { LabFormProps } from '@/types/interface';

export default function LabInfoForm({ info, addr, handleSetAddr, handleSetInfo}: LabFormProps) {

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
              <MenuItem value={10}>CSE</MenuItem>
              <MenuItem value={20}>ECE</MenuItem>
              <MenuItem value={30}>CHEM</MenuItem>
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
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="lab address-line1"
            variant="standard"
            value={addr.addr1}
            onChange={(e) => { handleSetAddr('addr1', e.target.value)}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="lab address-line2"
            variant="standard"
            value={addr.addr2}
            onChange={(e) => { handleSetAddr('addr2', e.target.value)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
           
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={addr.city}
            onChange={(e) => { handleSetAddr('city', e.target.value)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            value={addr.state}
            onChange={(e) => { handleSetAddr('state', e.target.value)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            type="number"
            value={addr.zip}
            onChange={(e) => { handleSetAddr('zip', e.target.value)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            value={addr.country}
            onChange={(e) => { handleSetAddr('country', e.target.value)}}
          />
        </Grid>
        
      </Grid>
    </React.Fragment>
  );
}