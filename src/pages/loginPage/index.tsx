
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Typography, TextField, Container } from '@mui/material';


function LoginPage() {

	const navigate = useNavigate();
	const [waiting, setWaiting] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e: any) => {
		e.preventDefault();
		setWaiting(true);
		fetch('http://localhost:8000/api/account/login/', {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password }),
		})
			.then(res => {
				if (res.ok) {
					console.log("login success!")
					navigate('/');
				} 
				setWaiting(false);
			})
			.catch(console.warn);
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<div style={{ display: 'flex' }}>
				
				<div
					style={{
						margin: '0px 16px',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
					}}
				>
					<div style={{ fontSize: 24 }}>The</div>
					<div style={{ fontSize: 48 }}>Morality</div>
					<div style={{ fontSize: 48 }}>Game</div>
				</div>
			</div>
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
