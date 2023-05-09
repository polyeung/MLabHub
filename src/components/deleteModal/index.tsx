import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import { UserData } from '@/types/interface';
import { useNotifs } from '@/context';
import { Navigate, useNavigate } from 'react-router-dom';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DeleteModal(props: {userData: UserData | null | undefined}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [password, setPassword] = useState<string>("");
    const [waiting, setWaiting] = useState<boolean>(false);
    const notifs = useNotifs();
    const navigate = useNavigate();

    function handleDelete() {
        handleClose();
        setWaiting(true);
        fetch('http://localhost:8000/api/account/delete/', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'password': password
              })
        })
        .then(res => {
            if (res.ok) {
              notifs.addNotif({ severity: 'success', message: 'Account deleted successfully!' });
                setOpen(false);
                navigate('/');
            } else { 
              res.json().then(data =>
                notifs.addNotif({
                  severity: 'error',
                  message: `Delete account error: ${data.error}`,
                }),
              );
            }
            setWaiting(false);
          })
          .catch(console.warn);
        };
  return (
    <div>
          <Button variant="outlined"
              sx={{ mt: '10px', color: '#01264B' }}
              startIcon={<AccountCircleSharpIcon />}
              onClick={ handleOpen}>
                    Delete Account
        </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
                  <Typography variant='h6' color= '#8b0000'>* Please input password to confirm deleting account</Typography>
                  <TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								value={password}
								onChange={e => setPassword(e.target.value)}
                  />
                  <Button variant='outlined'
                      sx={{ mt: '10px' }}
                      startIcon={<DeleteForeverSharpIcon />}
                      onClick={handleDelete}
                      disabled={ waiting }
                  >
                      Delete
                  </Button>
        </Box>
      </Modal>
    </div>
  );
}