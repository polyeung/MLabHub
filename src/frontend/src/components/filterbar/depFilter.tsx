import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { ClickAwayListener, Paper, Typography} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export function IndeterminateCheckbox() {
  const [checked, setChecked] = React.useState([true, false]);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked]);
  };

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label="Child 1"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Child 2"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
    </Box>
  );

  return (
    <div>
      <FormControlLabel
        label="Parent"
        control={
          <Checkbox
            checked={checked[0] && checked[1]}
            indeterminate={checked[0] !== checked[1]}
            onChange={handleChange1}
          />
        }
      />
      {children}
    </div>
  );
}
interface props {
  name: string
};

interface PopperProps {
  isOpen: boolean;
  anchorEl: null | HTMLElement;
  clickAwayHandler: () => void; // Now just a simple function that doesn't accept any parameters
}

const MyPopper = ({isOpen,anchorEl, clickAwayHandler}: PopperProps) => (
  <ClickAwayListener onClickAway={clickAwayHandler}>
      <Popper open={isOpen} anchorEl={anchorEl}>
              <Box sx={{ mt:1, p: 1, bgcolor: 'background.paper',boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.5)', }}>
                <Typography variant="h6">Filter by Department</Typography>
                <IndeterminateCheckbox/>
              </Box>
      </Popper>
  </ClickAwayListener> 
);


export default function TransitionsPopper() {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  return (
    <div>
      <Button onClick={handleClick} variant="outlined">Department</Button>
      {
        open && <MyPopper isOpen={open} anchorEl={anchorEl} clickAwayHandler={() => setOpen(false)}/> 
      }
    </div>
  );
}
