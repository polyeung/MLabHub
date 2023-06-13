import React, { useState, useEffect } from 'react';
import {  Route, Routes, useNavigate, useLocation} from 'react-router-dom';
import { Container, CircularProgress, Button, Box, Typography} from '@mui/material';
import Overview from './pages/overview';
import Labpage from './pages/labpage';
import Jobs from './pages/jobs';
import Post from './pages/post';
import Create from './pages/create';
import SignupPage from './pages/signupPage';
import Navbar from './components/navbar';
import OidcLoginPage from './pages/oidcLoginPage';
import { UserData } from './types/interface';
import Dashboard from './pages/dashboard';
import getCookie from './components/csrfToken';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


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
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    // get csrf first
    fetch('/api/account/csrf_cookie')
      .then(response => response.json())
        .then(data => {
          const csrftoken: (string | null) = getCookie('csrftoken');
          fetch('/api/account/is_login',{
                  method: 'GET',
                  credentials: 'include',
                    }).then(res => {
                      if (res.ok) {
                        
                        res.json().then(data => { setUserData(data); console.log(data) });

            } else { 
              setUserData(null);
            }
          });
        }).catch(error => console.error('Error:', error));

    window.addEventListener('scroll', buttonVisible);





  }, [location]);
  
  const BottomBanner = () => {
    return (
      <Box
        style={{
          backgroundColor: '#01305c',
          padding: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '10px',
          height: '10vh',
          borderTop: '4px solid #FFCB02',
          color: 'white',

          left: 0,
          bottom: 0,
          width: '100%',
        }}
      >
        {/* Banner content starts.. */}
        <Typography>© 2023 mlabhub.com. All Rights Reserved.</Typography>
      </Box>
    );
  };

  const buttonVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    // if a page is scrolled more than 150px, the button is visible
    if (scrolled > 150) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (

      <React.Fragment>
      { /* navbar begin. */}
      <Navbar userData={userData} />
      <Fab aria-label="go to top" onClick={scrollTop}
        sx={{
          position: 'fixed',
          top: "80%",
          right: -40,
          height: 80,
          width: 80,
          display: visible ? "initial" : "none",
          backgroundColor: "#00274C",
          color: "white"
        }}>
        <Typography variant='h6'
          sx={{
            position: 'relative',
            right: "25%",
            
          }}>
          TOP
        </Typography>
      </Fab>
      { /*navbar end */}
        <Container
				maxWidth="lg"
				sx={{
					flexGrow: 2,
					display: 'flex',
					alignItems: 'center',
          justifyContent: 'center',
          padding: '10px',
          marginTop: '10px',
          minHeight: '90vh', // Set container to fill the viewport height
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
          <Route path="/login" element={<OidcLoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
        
      </Container>
      <BottomBanner/>
      </React.Fragment>

  );
}

export default App;
