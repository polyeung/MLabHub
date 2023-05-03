import React, { useState, useEffect } from 'react';
import {  Route, Routes, Navigate, useNavigate, useLocation} from 'react-router-dom';
import { Container, CircularProgress, Button} from '@mui/material';
import Overview from 'pages/overview';
import Labpage from 'pages/labpage';
import Jobs from 'pages/jobs';
import Post from 'pages/post';
import Create from 'pages/create';
import LoginPage from 'pages/loginPage';
import SignupPage from 'pages/signupPage';
import Navbar from 'components/navbar';
import { UserData } from 'types/interface';
import Dashboard from 'pages/dashboard';

function ProtectedRoute(props: {
	userData: UserData | undefined | null;
	page: JSX.Element;
}) {
  const navigate = useNavigate();
	if (props.userData === undefined) {
    return <div><b style={{ marginRight: '10px' }}>Please signin to see content.</b>
    <CircularProgress/></div>;
	} else if (props.userData === null ) {
    return (<div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <b style={{ marginRight: '10px' }}>Please signin to see content.</b>
        <CircularProgress />
      </div>
      <Button variant='text' onClick={ () => navigate('/login')} >Login</Button>
        </div>);
	} else {
		return props.page;
	}
}

function Main() {
  const location = useLocation();
	const navigate = useNavigate();
	const [userData, setUserData] = useState<UserData | undefined | null>(undefined);
  useEffect(() => {
		fetch('http://localhost:8000/api/account/',{credentials: 'include'}).then(res => {
      if (res.ok) {
        res.json().then(data => setUserData(data));
      } else { 
        setUserData(null);
      }
		});
	}, [location]);

  return (

      <React.Fragment>
      { /* navbar begin */}
      <Navbar userData={userData} />
      { /*navbar end */}
        <Container
				maxWidth="lg"
				sx={{
					flexGrow: 2,
					display: 'flex',
					alignItems: 'center',
          justifyContent: 'center',
          padding: '10px',
          marginTop: '10px'
				}}
			>
        <Routes>
            { /*Non protected Routes */}
          <Route path="/" element={<Overview />} />
            <Route path="/labpage" element={<Labpage />} />
            <Route path="/jobs" element={<Jobs />} />
            { /*Protected routes */}
            <Route path="/post" element={<ProtectedRoute userData={userData} page={<Post />}/>} />
          <Route path="/create" element={<ProtectedRoute userData={userData} page={<Create />} />} />
          <Route path="/dashboard" element={<ProtectedRoute userData={userData} page={<Dashboard />} />} />
            { /* Account routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
      </Container>
      </React.Fragment>

  );
}

export default Main;

