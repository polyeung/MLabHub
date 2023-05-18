
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Typography, TextField, Container } from '@mui/material';
import { useNotifs } from '@/context';

function getCookie(name: string) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function LoginPage() {
	const notifs = useNotifs();
	const navigate = useNavigate();
	const [waiting, setWaiting] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e: any) => {
		e.preventDefault();
		setWaiting(true);
		//get csrf token
		// get csrf token first 
		// add token to headers
		fetch('/api/account/csrf_cookie')
			.then(response => response.json())
			.then(data => {
				const csrftoken: (string | null) = getCookie('csrftoken');
				fetch('/api/account/login', {
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
						'X-CSRFToken': csrftoken ? csrftoken : "random_token"
					},
					body: JSON.stringify({
						username,
						password,
		
					}),
				}).then(res => {
					if (res.ok) {
						notifs.addNotif({ severity: 'success', message: 'Successfully logged in!' });
						navigate('/');
					} else { 
						res.json().then(data =>
							notifs.addNotif({
								severity: 'error',
								message: `Login error: ${data.error}`,
							}),
						);
					}
					setWaiting(false);
				}).catch(console.warn);
			})
			.catch(error => {
				// Handle any errors
				console.error(error);
			});

		
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			
			<Container maxWidth="xs">
				<Card
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						padding: '12px 24px',
					}}
				>
					<CardContent>
						<Typography variant="h6" sx={{ marginBottom: 2 }}>
							Login
						</Typography>
						<form onSubmit={handleSubmit}>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="username"
								label="Username"
								name="username"
								value={username}
								onChange={e => setUsername(e.target.value)}
							/>
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
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								disabled={waiting}
								style={{
									margin: '12px 0 8px 0',
								}}
							>
								Sign In
							</Button>
						</form>
						<Link to="/signup">
							<Typography variant="body2">Don't have an account? Sign Up</Typography>
						</Link>
					</CardContent>
				</Card>
			</Container>
		</div>
	);
}

export default LoginPage;
