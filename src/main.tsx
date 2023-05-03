import React, { useState, useEffect } from 'react';
import {  Route, Routes, Navigate, useNavigate, useLocation} from 'react-router-dom';
import { Container, CircularProgress } from '@mui/material';
import Overview from 'pages/overview';
import Labpage from 'pages/labpage';
import Jobs from 'pages/jobs';
import Post from 'pages/post';
import Create from 'pages/create';
import LoginPage from 'pages/loginPage';
import SignupPage from 'pages/signup';

{ /* navbar begin */ }

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ScienceIcon from '@mui/icons-material/Science';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import { logoImg } from 'assets';
import { AssistWalkerTwoTone } from '@mui/icons-material';


const pages = [['Research Opportunities', '/jobs', '1'], ['Post Jobs', '/post', '2'], ['Post Lab Info', '/create', '3']];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];



function NavBar({ userData }: { userData?: UserData | null }) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  
function logoutFunc() {

    fetch('http://localhost:8000/api/account/logout/', { method: 'POST', credentials: 'include' }).then(res => {
        if (res.ok) {
            //notifs.addNotif({ severity: 'success', message: 'Successfully logged out.' });
          console.log("log out func!");
          alert("logout success!");
            navigate('/login');
        } else {
          alert("failed to logout");
        }
    });
};

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);

  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  function signInFunc() { 
    navigate('/login');
  }


  

  return (
    <AppBar position="static" style={{ backgroundColor: '#01305c' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={logoImg} style={{maxWidth: '50px', marginRight: '5px'}} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LabHub
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(([page, link, id]) => (
                <MenuItem key={page} onClick={() => { setAnchorElNav(null); navigate(link); }}>
                    <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MLabHub
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(([page, link, id]) => (
              <Button
                key={page}
                onClick={() => { setAnchorElNav(null); navigate(link); }}
                sx={{ my: 2, color: 'white', display: 'flex', mr: '10px', // set display to flex
                alignItems: 'center', // vertically center the contents
                justifyContent: 'center'}}
                startIcon={id == '1' ? <SchoolIcon />:(id == '2'? <WorkIcon/>:<ScienceIcon />)}
                
              >
                  {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={ userData?.username? userData.username: "Not Login"}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={ userData?.username} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userData &&
                <MenuItem key="1" onClick={handleCloseUserMenu}>
                  <Button variant='text' onClick={ logoutFunc }>Logout</Button>
                </MenuItem>}
              
                {userData &&
                <MenuItem key="2" onClick={handleCloseUserMenu}>
                  <Button variant='text' >Dashboard</Button>
                </MenuItem>}
              
              {!userData &&
                <MenuItem key="3" onClick={handleCloseUserMenu}>
                  <Button variant='text' onClick={ () => navigate('/login')} >Login</Button>
              </MenuItem>
              }
              
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

{ /* navbar end */}
interface UserData {
	username: string;
}

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
      <NavBar userData={userData} />
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
            <Route path="/create" element={<ProtectedRoute userData={userData} page={<Create />}  />} />
            { /* Account routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
      </Container>
      </React.Fragment>

  );
}

export default Main;

