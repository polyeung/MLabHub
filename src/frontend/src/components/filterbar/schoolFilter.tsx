import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { ClickAwayListener, Paper, Typography} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FilterProps, SchoolFilterProps} from '@/types/interface';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

const schoolDict = {
    "lsa":"Literature, Sci, and the Arts",
    "eng":"Engineering",
    "si":"Information"
};


interface props {
  name: string
};

interface PopperProps {
  isOpen: boolean;
  anchorEl: null | HTMLElement;
  clickAwayHandler: () => void; // Now just a simple function that doesn't accept any parameters
}


export default function TransitionsPopper({searchCriteria, setDict, state, setState}: SchoolFilterProps) {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  // for eg. select lsa, eng but not si => lsa,eng
  const getSchoolStr = () => {
    return Object.entries(state)
          .filter(([, value]) => value)
          .map(([key]) => key)
          .join(',');
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = {
      ...state,
      [event.target.name]: event.target.checked,
    };
    console.log("key: ", event.target.name);
    console.log("value: ",  event.target.checked);
    setState(newState);

    

    const newSchoolStr = Object.entries(newState)
          .filter(([, value]) => value)
          .map(([key]) => key)
          .join(',');

    console.log("str: ", newSchoolStr);
    console.log("cur State: ", state);
    
    // Uncommenting this might work now
    setDict("school", newSchoolStr);
    console.log("searchCriteria: ", searchCriteria);
  };

  const { si, lsa, eng } = state;
  const error = [si, lsa, eng].filter((v) => v).length !== 2;
  const count = Object.values(state).filter(Boolean).length;
  const MyPopper = ({isOpen,anchorEl, clickAwayHandler}: PopperProps) => (
    <ClickAwayListener onClickAway={clickAwayHandler}>
        <Popper open={isOpen} anchorEl={anchorEl} style={{ zIndex: 1 }}>
                <Box sx={{ mt:1, p: 1, bgcolor: 'background.paper',
                            boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.5)',
                            display:'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'}}>
                  <Typography variant="h6">Filter by School</Typography>
                  <Box sx={{ display: 'flex' }}>
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                    <FormHelperText>{count.toString()} selected</FormHelperText>
                      <FormGroup>
                      <FormControlLabel
                          control={
                            <Checkbox checked={eng} onChange={handleChange} name="eng" />
                          }
                          label="Engineering"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox checked={si} onChange={handleChange} name="si" />
                          }
                          label="Information"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox checked={lsa} onChange={handleChange} name="lsa" />
                          }
                          label="Literature, Sci, and the Arts"
                        />
                        
                      </FormGroup>
                      
                    </FormControl>
                  </Box>
                </Box>
        </Popper>
    </ClickAwayListener> 
  );

 
  return (
    <div>
      <Button onClick={handleClick} variant={count > 0 ? "contained":"outlined" }
      sx={{
        fontSize: {sx:'0.2rem', md:'0.9rem'},
      }}>{count > 0? "(" + count+") ":""}School</Button>
      {
        open && <MyPopper isOpen={open} anchorEl={anchorEl} clickAwayHandler={() => setOpen(false)}/> 
      }
    </div>
  );
}
