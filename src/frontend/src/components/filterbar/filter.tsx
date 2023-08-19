import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { ClickAwayListener, Paper} from '@mui/material';

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
              <Box sx={{ border: 1,mt:1, p: 1, bgcolor: 'background.paper' }}>
                The content of the Popper.
              </Box>
      </Popper>
  </ClickAwayListener> 
);
export default function TransitionsPopper({ name }: props) {
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
      <Button onClick={handleClick} variant="outlined">{name}</Button>
      {
        open && <MyPopper isOpen={open} anchorEl={anchorEl} clickAwayHandler={() => setOpen(false)}/> 
      }
    </div>
  );
}
