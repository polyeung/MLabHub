import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { JobReviewFormProps } from '@/types/interface';


export default function Review({ info }: JobReviewFormProps) {
  function checkEmpty(input: string): string{ 
        if (typeof input === 'string') {
          return input.trim();
        }
        return input;
    }
    function trans_key(value: string): string { 
        if (value == "link") {
            return "URL";
        } else if (value == "addr") {
            return "address";
        } else if (value == "dep") { 
            return "Department"
        }
        return value;
    };
    {console.log(info)}
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Review Information
      </Typography>
      
      <Grid container spacing={3}>
        
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Basic Info
          </Typography>
          
          
          
        </Grid>
      </Grid>
      <Grid container spacing={3}>
            
        {Object.entries(info).map(([key, value]) => (
            key !== 'addr' && key!=='rate' && key!=='id'
              && key!=='labid' &&key !== 'course' && key!=='rate_type' && (<React.Fragment key={key}>
                <Grid item xs={5}>
                  <Typography sx={{ fontWeight: 600 }} gutterBottom>
                  {key === "title"
                  ? "Job Title"
                  : key === "contact"
                  ? "Contact Email"
                  : key === "intro"
                  ? "Lab Introduction"
                  : key === "labname"
                  ? "Lab Name"
                  : key === "lablink"
                  ? "Lab Website"
                  : key === "workhoursselection"
                  ? "Weekly Work Hours Requirement"
                  : key === "workmodel"
                  ? "Work Model"
                  : key === "consecutivesemestersselect"
                  ? "Consecutive Semesters Requirement"
                  : key}
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography gutterBottom>{checkEmpty(value)}</Typography>
                </Grid>
            </React.Fragment>)
        ))}
        
      </Grid>
      <Grid container spacing={2}>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Required Courses:
          </Typography>
        </Grid>
      </Grid>
      <List disablePadding>
        {info.course.map((item, idx) => (
          <ListItem key={idx} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={"required course " + (idx + 1)} sx={{ fontWeight: 600 }}  />
                
                 <Typography variant="body2" sx={{ fontWeight: 500 }}>{item}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Number of Required Courses" sx={{ fontWeight: 600 }}/>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            { Object.keys(info.course).length }
          </Typography>
        </ListItem>
      </List>
        <Grid container spacing={2}>
          <Grid item container direction="column" xs={12} sm={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Rate Type and Rate
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <React.Fragment key='ratetype'>
              <Grid item xs={5}>
                  <Typography sx={{ fontWeight: 600 }} gutterBottom>{'Rate Type'}</Typography>
              </Grid>
              <Grid item xs={7}>
              <Typography gutterBottom>
                {info.rate_type === 'Number' ? 'Hourly Rate' :
                info.rate_type === 'Credit' ? 'Course Credit' :
                info.rate_type === 'Volunteer' ? 'Volunteer' :
                info.rate_type === 'Flexible' ? 'Flexible' :
                ''}
              </Typography>
              </Grid>
              {info.rate_type == 'Number' && (<React.Fragment key='rate'>
                <Grid item xs={5}>
                    <Typography sx={{ fontWeight: 600 }} gutterBottom>{'Rate'}</Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography gutterBottom>{info.rate}</Typography>
                </Grid>
                </React.Fragment>)}
          </React.Fragment>
        </Grid>
    </React.Fragment>
  );
}