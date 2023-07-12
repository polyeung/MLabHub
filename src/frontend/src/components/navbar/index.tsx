import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, Link} from 'react-router-dom';
import ScienceIcon from '@mui/icons-material/Science';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { MichiganLogo } from '@/assets';
import { useNotifs } from '@/context';
import { UserData } from '@/types/interface';
import getCookie from '@/components/csrfToken';
import { ScreenContext } from '@/screenContext';

const pages = [['Research Opportunities', '/jobs', '1'], ['Post Jobs', '/post', '2'], ['Post Lab Info', '/create', '3']];
const pagesStack = [['Research Opportunities', '/jobs'], ['Post Jobs', '/post'], ['Post Lab Info', '/create'], ['Dashboard', '/dashboard'],['Logout', '']]

function NavBar({ userData }: { userData?: UserData | null }) {



  const { isSmallScreen, isMiddleScreen } = React.useContext(ScreenContext);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const notifs = useNotifs();
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
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

  const getImgStyle = () => { 
    if (isSmallScreen) {
      return ['50px', '5%'];
    } else if (isMiddleScreen) {
      return ['65px', '5%'];
    } else { 
      return ['80px', '13%'];
    }
  }
  const [imgHeight, imgLeftMargin] = getImgStyle();

  return (

      <AppBar position="static" style={{ backgroundColor: '#001E3E' }}>
      <Box className="banner"
        style={{ backgroundColor: '#00274c', height: '100px', width: '100%', display: 'flex', flexDirection: 'row' }}
        component={Link}
        to="/">
        <img src={MichiganLogo} alt='logo' style={{ maxWidth: '90%', height: imgHeight, marginLeft: imgLeftMargin, marginTop: '1rem', marginBottom: '0.5rem'}} />
      </Box>
      <Container maxWidth="xl" >
      {/*First Tool Bar */ }
        <Toolbar disableGutters variant='dense'>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', }  }}>
            <IconButton
              size="small"
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
              {pagesStack.map(([page, link]) => (

                <MenuItem key={page} onClick={() => { setAnchorElNav(null); navigate(link); }}>
                     <Typography variant="body2" textAlign="center" fontSize="0.8rem"> 
                      {page}
                    </Typography>
                </MenuItem>
              
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', alignItems: 'right', justifyContent: 'flex-end' } }}>
            {pages.map(([page, link, id]) => (
              <Button
                key={page}
                onClick={() => { setAnchorElNav(null); navigate(link); }}
                sx={{ my: 2, color: 'white', display: 'flex', mr: '10px', // set display to flex
                alignItems: 'center', // vertically center the contents
                  justifyContent: 'center',
                fontSize: '0.8rem'
                }}
                startIcon={id == '1' ? <SchoolIcon />:(id == '2'? <WorkIcon/>:<ScienceIcon />)}
                
              >
                  {page}
              </Button>
            ))}
            {userData &&
              <Button
                key={"dashboard"}
                onClick={() => { setAnchorElNav(null); navigate('/dashboard'); }}
                sx={{
                  my: 2, color: 'white', display: 'flex', mr: '10px', // set display to flex
                  alignItems: 'center', // vertically center the contents
                  justifyContent: 'center',
                  fontSize: '0.8rem'
                }}
                startIcon={<AccountBoxIcon />}
              >
                {"Dashboard"}
              </Button>
            }
          </Box>
          
        </Toolbar>
        
        <Toolbar disableGutters variant='dense' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'right', justifyContent: 'flex-end' }}>
            {!userData &&
              <Button
                key={"Login"}
                href="/oidc/authenticate/"
                sx={{
                  my: 2, color: 'white', display: 'flex', mr: '10px', // set display to flex
                  alignItems: 'center', // vertically center the contents
                  justifyContent: 'center',
                  fontSize: '0.8rem'
                }}
                startIcon={<LoginIcon />}
              >
                {"Login"}
              </Button>
            }
            {userData &&
              <Button
                key={"Logout"}
                onClick={ logoutFuncOidc }
                sx={{
                  my: 2, color: 'white', display: 'flex', mr: '10px', // set display to flex
                  alignItems: 'center', // vertically center the contents
                  justifyContent: 'center',
                  fontSize: '0.8rem'
                }}
                startIcon={<LogoutIcon />}
              >
                {"Logout " + userData.name}
              </Button>
            }
            
        </Toolbar>
      </Container>
      </AppBar>

  );
}

export default NavBar;