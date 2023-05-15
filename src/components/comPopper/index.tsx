import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {TextField, Rating} from '@mui/material';
import { UserData } from '@/types/interface';
import { useNotifs } from '@/context';
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

interface modalProps { 
  labid: string;
  userData: UserData | undefined | null;
  deleteClicked: boolean;
  setDeleteClicked: (value: boolean) => void;
  
}
export default function BasicModal({ labid, userData, deleteClicked, setDeleteClicked}: modalProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number | null>(4);
  const [word, setWord] = useState<string>("");
  const [waiting, setWaiting] = useState(false);
  const handleOpen = () => setOpen(true);
  const notifs = useNotifs();
  function handleSubmit() { 
    setWaiting(true);
    fetch(`/api/addComments/${labid}`, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'name': userData?.username,
        'rating': value,
        'word': word,
      }),
    })
    .then(res => {
      if (res.ok) {
        notifs.addNotif({ severity: 'success', message: 'Comments added successfully!' });
        setOpen(false);
        setDeleteClicked(!deleteClicked);
      } else { 
        res.json().then(data =>
          notifs.addNotif({
            severity: 'error',
            message: `Login error: ${data.error}`,
          }),
        );
      }
      setWaiting(false);
    })
    .catch(console.warn);
  };

  return (
    <div>
          <Button onClick={handleOpen} 
              style={{ backgroundColor: '#01305C', color: '#FFCB02' }}>
              Write Comments
          </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
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
          value={word}
          onChange={ (e) => setWord(e.target.value)}
          multiline
          rows={6}
          maxRows={6}
          inputProps={{ maxLength: 590 }}
          variant="filled"
                  />
          <Box sx={{display: 'flex', flexDirection: 'row', mt: '10px'}}>
          <Button variant="contained"
              style={{ color: '#01305C', backgroundColor: '#FFCB02' }}
              onClick={handleSubmit}
              disabled={waiting}>
              Submit
          </Button>
              <Button variant="contained"  onClick={() => setOpen(false)} style={{marginLeft: '5px',backgroundColor: '#c7c3c3'}}>
                Cancle
              </Button>
          </Box>
                  
        </Box>
      </Modal>
    </div>
  );
}