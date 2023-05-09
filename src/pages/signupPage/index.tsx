import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Typography, TextField, Container } from '@mui/material';
import { useNotifs } from '@/context';

function SignupPage() {
	const notifs = useNotifs();
	const navigate = useNavigate();
	const [waiting, setWaiting] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [secPass, setSecPass] = useState('');
	//const [passSame, setPassSame]
	{ /*Username only alow alphabet, number and dash */}
	function handleChangeUsername(e: any) { 
		const ALPHA_NUMERIC_DASH_REGEX = /^[a-zA-Z0-9-]+$/;
		if (e.target.value !== "" && !ALPHA_NUMERIC_DASH_REGEX.test(e.target.value)) {
			return;
		}
		setUsername(e.target.value)
	};
	function handleChangePass(e: any) { 
		const ALPHA_NUMERIC_SPECIAL_REGEX = /^[a-zA-Z0-9!@#$%^&*()]+$/;
		if (e.target.value !== "" && !ALPHA_NUMERIC_SPECIAL_REGEX.test(e.target.value)) {
			return;
		}
		setPassword(e.target.value)
	}
	function handleChangeConfPass(e: any) { 
		const ALPHA_NUMERIC_SPECIAL_REGEX = /^[a-zA-Z0-9!@#$%^&*()]+$/;
		if (e.target.value !== "" && !ALPHA_NUMERIC_SPECIAL_REGEX.test(e.target.value)) {
			return;
		}
		setSecPass(e.target.value)
	}
	const handleSubmit = (e: any) => {
		e.preventDefault();
		// error checking
		if (password !== secPass) { 
			notifs.addNotif(
				{
					severity: 'error',
					message: 'Confirm password not the same!'
				});
			return;
		}
		setWaiting(true);
		fetch('http://localhost:8000/api/account/create/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password }),
		})
			.then(res => {
				if (res.ok) {
					notifs.addNotif({ severity: 'success', message: 'Successfully signed up!' });
					navigate('/');
				} else {
					res.json().then(data =>
						notifs.addNotif({
							severity: 'error',
							message: `Signup error: ${data.error}`,
						}),
					);
				}
				setWaiting(false);
			})
			.catch(console.warn);
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
							Sign Up
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
								onChange={ (e) =>  handleChangeUsername(e)}
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
								onChange={e => handleChangePass(e)}
							/>

							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="password"
								label="Confirm Password"
								type="password"
								id="confirm-password"
								value={secPass}
								onChange={e => handleChangeConfPass(e) }
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
								Sign Up
							</Button>
						</form>
						<Link to="/login">
							<Typography variant="body2">Already have an account? Sign In</Typography>
						</Link>
					</CardContent>
				</Card>
			</Container>
		</div>
	);
}

export default SignupPage;
