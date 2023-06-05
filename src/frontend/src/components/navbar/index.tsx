import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, Link} from 'react-router-dom';
import ScienceIcon from '@mui/icons-material/Science';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import { logoImg } from '@/assets';
import { useNotifs } from '@/context';
import { UserData } from '@/types/interface';

const pages = [['Research Opportunities', '/jobs', '1'], ['Post Jobs', '/post', '2'], ['Post Lab Info', '/create', '3']];

function NavBar({ userData }: { userData?: UserData | null }) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const notifs = useNotifs();
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
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
  
  function logoutFunc() {
  // get csrf first
  fetch('/api/account/csrf_cookie')
			.then(response => response.json())
    .then(data => {
      const csrftoken: (string | null) = getCookie('csrftoken');
      fetch('/api/account/logout', {
        method: 'POST', credentials: 'include',
        headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken ? csrftoken : "random_token"
      },}).then(res => {
        if (res.ok) {
            //notifs.addNotif({ severity: 'success', message: 'Successfully logged out.' });
            notifs.addNotif({ severity: 'success', message: 'Successfully logged out.' });
            navigate('/login');
        } else {
          notifs.addNotif({ severity: 'error', message: "Failed to logout"});
        }
    });
    }
  )
  
  };
  
  function logoutFuncOidc() { 
    fetch('/api/account/csrf_cookie')
      .then(response => response.json())
      .then(data => {
        const csrftoken: (string | null) = getCookie('csrftoken');
        fetch('/api/account/logout', {
          method: 'POST', credentials: 'include',
          headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken ? csrftoken : "random_token"
        },})
          .then(response => {
            if (response.ok) {
              return response.json(); // Parse the response body as JSON
            } else {
              throw new Error('get logout url failed');
            }
          })
          .then(data => {
            const logoutUrl = data.logout_url;
            console.log("logoutUrl", logoutUrl);
            fetch(logoutUrl,  {
              method: 'POST', credentials: 'include',
              headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken ? csrftoken : "random_token"
            },})
              .then(response => {
                if (response.ok) {
                  console.log('Logout success');
                  notifs.addNotif({ severity: 'success', message: 'Successfully logged out.' });
                  navigate('/');
                } else {
                  console.log('Logout failed');
                }
              })
              .catch(error => {
                console.log('Logout request failed:', error);
              });
          })
          .catch(error => {
            console.log('Logout request failed:', error);
          })
      })
  };
  

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);

  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  

  return (
    <AppBar position="static" style={{ backgroundColor: '#01305c' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={logoImg} style={{ maxWidth: '50px', marginRight: '5px' }} />
          <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            LabHub
            </Typography>
            </Link>

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
          <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            MLabHub
            </Typography>
            </Link>
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
                  <Button variant='text' onClick={ logoutFuncOidc }>Logout</Button>
                </MenuItem>}
              
                {userData &&
                <MenuItem key="2" onClick={handleCloseUserMenu}>
                  <Button variant='text' onClick={ () => navigate('/dashboard')}>Dashboard</Button>
                </MenuItem>}
              
              {!userData &&
                <MenuItem key="3" onClick={handleCloseUserMenu}>
                  <Button component="a" href="" rel="noopener noreferrer" onClick={ () => navigate('/oidc/authenticate/')} >Login</Button>
                </MenuItem>
              }
              
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;