import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { JobReviewFormProps } from '@/types/interface';


export default function Review({ peopleDict, info }: JobReviewFormProps) {
    function checkEmpty(input: string):string{ 
        if (input.trim().length == 0) { 
            return "Not Filled In";
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
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Review Information
      </Typography>
      <Grid container spacing={2}>
        
              <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Basic Info
          </Typography>
          <Grid container>
            {Object.entries(info).map(([key, value]) => (
                key !== 'addr' && (<React.Fragment key={key}>
                    <Grid item xs={5}>
                        <Typography sx={{ fontWeight: 600 }} gutterBottom>{trans_key(key)}</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography gutterBottom>{checkEmpty(value)}</Typography>
                    </Grid>
                </React.Fragment>)
            ))}
            
          </Grid>
        </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item container direction="column" xs={12} sm={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Members
            </Typography>
              </Grid>
              </Grid>
      <List disablePadding>
        {Object.entries(peopleDict).map(([key, value]) => (
          <ListItem key={key} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={"member" + key} sx={{ fontWeight: 600 }} secondary={value.email} />
                
                 <Typography variant="body2" sx={{ fontWeight: 500 }}>{value.name}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Number of Members" sx={{ fontWeight: 600 }}/>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            { Object.keys(peopleDict).length }
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}