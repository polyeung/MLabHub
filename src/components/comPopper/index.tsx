import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {TextField, Rating} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState<number | null>(4);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
          <Button onClick={handleOpen} 
              style={{ backgroundColor: '#01305C', color: '#FFCB02' }}>
              Write Comments
          </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h5" component="h2" sx={{mb: '10px'}}>
            Comments
                  </Typography>
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                    setValue(newValue);
                    }}
      />
        <TextField
          fullWidth
          id="outlined-textarea"
          label="Share details of your own experience at this lab"
          placeholder="type..."
          multiline
          rows={6}
          maxRows={6}
          variant="filled"
                  />
                  <Box sx={{display: 'flex', flexDirection: 'row', mt: '10px'}}>
                  <Button variant="contained"
                      style={{ color: '#01305C', backgroundColor: '#FFCB02' }}
                      onClick={ handleClose} >
                      Submit
                  </Button>
                      <Button variant="contained"  onClick={handleClose} style={{marginLeft: '5px',backgroundColor: '#c7c3c3'}}>
                        Cancle
                      </Button>
                      </Box>
                  
        </Box>
      </Modal>
    </div>
  );
}