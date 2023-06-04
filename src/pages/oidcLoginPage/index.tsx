import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import getCookie from '@/components/csrfToken';
import { useNotifs } from '@/context';

export default function oidcLoginPage() {

    const notifs = useNotifs();
    /*
    const loginFunc = () => { 
        fetch('/api/account/csrf_cookie')
			.then(response => response.json())
            .then(data => {
                const csrftoken: (string | null) = getCookie('csrftoken');
                console.log("csrf token: ", csrftoken)
            fetch('/oidc/authenticate/', {
                method: 'GET', credentials: 'include',
                headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken ? csrftoken : "random_token"
            },}).then(res => {
                if (res.ok) {
                    //notifs.addNotif({ severity: 'success', message: 'Successfully logged out.' });
                    notifs.addNotif({ severity: 'success', message: 'Login Successfully' });
                    navigate('/');
                } else {
                notifs.addNotif({ severity: 'error', message: "Failed to login"});
                }
            });
            }
  )
    };*/

    return (
        <Box>

            <Button component="a" href="/oidc/authenticate/" target="_blank" rel="noopener noreferrer">
            Login with Umich Credential
            </Button>
        </Box>
    );
};