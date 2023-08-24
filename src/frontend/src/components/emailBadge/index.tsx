import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Chip from '@mui/material/Chip';
import ButtonGroup from '@mui/material/ButtonGroup';
import {EmailBadgeProps} from '@/types/interface';
import SendIcon from '@mui/icons-material/Send';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  
  boxShadow: 24,
  p: 4,
};


export default function EmailBadge({emails, people}: EmailBadgeProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

  return (
    <div>
      <Chip
        label="Cold Email"
        onClick={handleOpen}
        icon={<MailOutlineIcon />}
        />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Choose emails
          </Typography>
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical contained button group"
            variant="text"
            fullWidth
        >
            {people.map((item, index) =>
                <Button key={index + "-" + item} fullWidth component="a" href={`mailto:${emails[index]}?&body=Hello, ${item}!`}
                disabled={emails[index] == "NA" || emails.length == 0}
                endIcon={<SendIcon /> }>
                    {item}
                </Button>
            )}
        </ButtonGroup>
        </Box>
      </Modal>
    </div>
  );
}