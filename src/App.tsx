import React, { useState, useEffect } from 'react';
import {  Route, Routes, useNavigate, useLocation} from 'react-router-dom';
import { Container, CircularProgress, Button} from '@mui/material';
import Overview from './pages/overview';
import Labpage from './pages/labpage';
import Jobs from './pages/jobs';
import Post from './pages/post';
import Create from './pages/create';
import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';
import Navbar from './components/navbar';
import { UserData } from './types/interface';
import Dashboard from './pages/dashboard';
import getCookie from './components/csrfToken';


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

function App() {
  const location = useLocation();
	const [userData, setUserData] = useState<UserData | undefined | null>(undefined);
  useEffect(() => {
		


    // get csrf first
    fetch('/api/account/csrf_cookie')
      .then(response => response.json())
        .then(data => {
          const csrftoken: (string | null) = getCookie('csrftoken');
          console.log('csrftoken:',csrftoken)
          fetch('/api/account/is_login',{credentials: 'include',
                  headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken ? csrftoken : "random_token"
                  },
                    }).then(res => {
            if (res.ok) {
              res.json().then(data => setUserData(data));
              console.log(res);
            } else { 
              setUserData(null);
            }
          });
        }).catch(error => console.error('Error:', error));







	}, [location]);

  return (

      <React.Fragment>
      { /* navbar begin. */}
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
          <Route path="/" element={<Overview userData={userData}/>} />
          <Route path="/labpage" element={<Labpage userData={userData}/>} />
          <Route path="/jobs" element={<Jobs />} />

            { /*Protected routes */}
          <Route path="/post" element={<ProtectedRoute userData={userData} page={<Post />}/>} />
          <Route path="/create" element={<ProtectedRoute userData={userData} page={<Create />} />} />
          <Route path="/dashboard" element={<ProtectedRoute userData={userData} page={<Dashboard userData={userData}/>} />} />
          { /* Account routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          </Routes>
      </Container>
      </React.Fragment>

  );
}

export default App;

