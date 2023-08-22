import React, { useState, useEffect } from 'react';
import {  Route, Routes, useNavigate, useLocation} from 'react-router-dom';
import { Container, CircularProgress, Button, Box, Typography} from '@mui/material';
import Overview from './pages/overview';
import Labpage from './pages/labpage';
import Jobs from './pages/jobs';
import Post from './pages/post';
import Create from './pages/create';
import Navbar from './components/navbar';
import OidcLoginPage from './pages/oidcLoginPage';
import NotFoundPage from './pages/notFoundPage';
import { UserData } from './types/interface';
import Dashboard from './pages/dashboard';
import getCookie from './components/csrfToken';
import Fab from '@mui/material/Fab';
import BottomBanner from './components/bottombanner'
import {SearchCriteriaProps} from '@/types/interface';
import FilterBar from '@/components/filterbar';

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
                  headers: { 
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken ? csrftoken : "random_token"
                  },
                    }).then(res => {
                      if (res.ok) {
                        res.json().then(data => { setUserData(data); });

            } else { 
              setUserData(null);
            }
          });
        }).catch(error => console.error('Error:', error));
        
        window.addEventListener('scroll', buttonVisible);

  }, [location]);

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

  // For Search Criteria
  const searchParams = new URLSearchParams(location.search);
  // get param from current url
  const initialSchool = searchParams.get('school') ? searchParams.get('school') as string : "";
  const initialDep = searchParams.get('dep') ? searchParams.get('dep') as string : "";
  const initialLabel = searchParams.get('label') ? searchParams.get('label') as string : "";

  const setSearchKey = React.useCallback((key:string, value:string) => {
    setSearchCriteria(prevCriteria => ({
      ...prevCriteria,
      [key]: value
    }));
  }, []);

  const [searchCriteria, setSearchCriteria] = useState<SearchCriteriaProps>({
    school: initialSchool,
    dep: initialDep,
    label: initialLabel
  });



  return (

      <React.Fragment>
      { /* navbar begin. */}
      <Navbar userData={userData} />
      
      {visible && <Fab aria-label="go to top" onClick={scrollTop}
        sx={{
          position: 'fixed',
          top: "80%",
          right: -40,
          height: 80,
          width: 80,
          backgroundColor: "#00274C",
          color: "white",
          border:  "1px solid #FFCB05"
        }}>

        <Typography variant='h6'
          sx={{
            position: 'relative',
            right: "25%",
            
          }}>
          TOP
        </Typography>
      </Fab>}
      { /*navbar end */}

        <Container
				maxWidth="lg"
				sx={{
					flexGrow: 2,
					display: 'flex',
          justifyContent: 'center',
          padding: '10px',
          marginTop: '10px',
          minHeight: '90vh', // Set container to fill the viewport height
				}}
			>
        <Routes>
          { /*Non protected Routes */}
          <Route path="/" element={
            <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                width: '100%'
            }}
        >
              <FilterBar searchCriteria={searchCriteria} setDict={setSearchKey} setSearchCriteria={setSearchCriteria}/>
              <Overview userData={userData} searchCriteria={searchCriteria} setDict={setSearchKey}/>
            </Box>
          } />
          
          <Route path="/labpage" element={<Labpage userData={userData}/>} />
          <Route path="/jobs" element={<Jobs />} />

            { /*Protected routes */}
          <Route path="/post" element={<ProtectedRoute userData={userData} page={<Post />}/>} />
          <Route path="/create" element={<ProtectedRoute userData={userData} page={<Create />} />} />
          <Route path="/dashboard" element={<ProtectedRoute userData={userData} page={<Dashboard userData={userData}/>} />} />
          { /* Account routes */}
          <Route path="/login" element={<OidcLoginPage />} />
          {/* 404 route */}
           <Route path="*" element={<NotFoundPage />} />
        </Routes>
        
      </Container>

      <BottomBanner/>
      </React.Fragment>

  );
}

export default App;

