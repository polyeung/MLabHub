import * as React from 'react';
import {useState, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import InputAdornment from '@mui/material/InputAdornment';
import { RichLabInfoType, RichLabInfoTemplate } from '@/types/interface';
import { JobFormProps } from '@/types/interface';

export default function JobInfoForm({ info, handleSetInfo, handleSetInfoid, handleSetInfoArray}: JobFormProps) {

  const courses_req: string[] = info['course']
  const [workHoursRequirement, setWorkHoursRequirement] = useState<string>("");
  const [workModel, setWorkModel] = useState<string>("");
  const [consecutiveSemesters, setConsecutiveSemesters] = useState<string>("");



  const handleAddClick = () => {

    courses_req.push("");
    handleSetInfoArray('course', courses_req);
    console.log("Object.keys(peopleDict).length: ", Object.keys(courses_req).length);
  }
  const handleDeleteClick = () => {
    // delete react element
    courses_req.pop();
    handleSetInfoArray('course', courses_req);
    console.log("Object.keys(peopleDict).length: ", Object.keys(courses_req).length);

  };

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
      handleSetInfoid('rate', 0);
    }else{
      handleSetInfo('rate_type', "Number");
    }
  };

  const handleUpdatecourse = (id:number, course:string) =>{
    courses_req[id] = course;
    handleSetInfoArray('course', courses_req);
  };

  const [labinfo, setLabinfo] = useState<RichLabInfoType[]>([]);

  useEffect(() => {
    fetch(`/api/lab/getLabInfo`)
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
                <MenuItem value={"Number"}>Pay</MenuItem>
                <MenuItem value={"Volunteer"}>Volunteer</MenuItem>
                <MenuItem value={"Flexible"}>Credit or Pay or Volunteer</MenuItem>
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
            required={info.rate_type !== "Credit"}
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
            required
            id="contact"
            name="contact"
            label="Contact Email"
            fullWidth
            variant="standard"
            value={info.contact}
            onChange={(e) => { handleSetInfo('contact', e.target.value)}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="intro"
            name="intro"
            label="Introduction to this job position"
            fullWidth
            variant="standard"
            value={info.intro}
            onChange={(e) => { handleSetInfo('intro', e.target.value)}}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="work-hours-label">Weekly Work Hours Requirement *</InputLabel>
            <Select
              required
              labelId="work-hours-label"
              id="work-hours-select"
              value={workHoursRequirement}
              label="Weekly Work Hours Requirement"
              onChange={(e) => setWorkHoursRequirement(e.target.value as string)}
            >
              <MenuItem value="< 10 hours">&lt; 10 hours</MenuItem>
              <MenuItem value="10-20 hours">10-20 hours</MenuItem>
              <MenuItem value="20-30 hours">20-30 hours</MenuItem>
              <MenuItem value="> 30 hours">&gt; 30 hours</MenuItem>
              <MenuItem value="flexible">Flexible</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="work-model-label">Work Model *</InputLabel>
            <Select
              required
              labelId="work-model-label"
              id="work-model-select"
              value={workModel}
              label="Work Model"
              onChange={(e) => setWorkModel(e.target.value as string)}
            >
              <MenuItem value="Onsite">Onsite</MenuItem>
              <MenuItem value="Remote">Remote</MenuItem>
              <MenuItem value="Hybrid">Hybrid</MenuItem>
              <MenuItem value="Unsure">Unsure</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="consecutive-semesters-label">Required Consecutive Working Semesters *</InputLabel>
            <Select
              required
              labelId="consecutive-semesters-label"
              id="consecutive-semesters-select"
              value={consecutiveSemesters}
              label="Required Consecutive Working Semesters"
              onChange={(e) => setConsecutiveSemesters(e.target.value as string)}
            >
              <MenuItem value="A semester">A semester</MenuItem>
              <MenuItem value="Two semesters">Two semesters</MenuItem>
              <MenuItem value="Academic year">Academic year</MenuItem>
              <MenuItem value="Summer">Summer</MenuItem>
            </Select>
          </FormControl>
        </Grid>



      </Grid>
      {/* Add some space*/}
      <Grid item xs={12} style={{ marginBottom: '16px' }}></Grid>
      <Typography variant="h6" gutterBottom>
        Required Courses
      </Typography>
      <Grid container spacing={3}>
      {courses_req.map((item, id) => (
        <React.Fragment key={id}>
           
            <Grid item xs={12} md={6}>
              <TextField
                required
                id={"course " + id}
                label={"course " + id}
              fullWidth
                variant="standard"
                value={item}
                onChange={(e) => {
                  const updatedValue = {
                    course: e.target.value
                  };
                  handleUpdatecourse(id, updatedValue.course);
                }}
              />
            </Grid>
            
          </React.Fragment>
        ))}

        <Grid item xs={12} md={12}>
        <ButtonGroup size="small" aria-label="small button group">
            {info['course'].length < 5 && (<Button key={ "addbutton"} onClick={handleAddClick}>+</Button>)}
            {info['course'].length > 1 &&(<Button  key={ "deletebutton"} onClick={  handleDeleteClick }>-</Button>)}
        </ButtonGroup>
        </Grid>

        {Object.keys(courses_req).length == 5 && (<Grid item xs={12} md={12}>
          <Typography variant="subtitle2">*Max 5 courses</Typography>
        </Grid>)}

        {Object.keys(courses_req).length == 1 && (<Grid item xs={12} md={12}>
          <Typography variant="subtitle2">*Please at least input one required course</Typography>
        </Grid>)}
      </Grid>
    </React.Fragment>
  );
}