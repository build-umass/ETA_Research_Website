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
import AdbIcon from '@mui/icons-material/Adb';

import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Grid from '@mui/material/Grid';

const pages = [['Home'], ['About'], ['Faculty', 'Person A', 'Person B'], ['Research', 'Paper 1', 'Paper 2', 'Paper 3']];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function AboutPage() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={6}>
        <Box sx={{ backgroundColor: 'grey.300', padding: 2 }}>
          <Typography variant="h4" gutterBottom>
            About the Lab
          </Typography>
          <Typography variant="body1">
            About page
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

// function createRoutes(menuOptions: string[][]) {
//   return menuOptions.map(options => options.map(option =>
//       // TODO: create general templates for different types of webpages that can be loaded for each menu option based on the contentful data
//     ));
// }

// Component used to create a fade animation between page transitions
const FadeTransition = ({ children }) => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={500}>
        <div>{children}</div>
      </CSSTransition>
    </TransitionGroup>
  );
};

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [anchorElDropdown, setAnchorElDropdown] = React.useState<null | HTMLElement>(null);
  // stores number corresponding to index of pages, helps to decide which dropdown menu to open
  const [currentOpenDropdown, setCurrentOpenDropdown] = React.useState<null | number>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenDropdown = (event: React.MouseEvent<HTMLElement>, currMenu: number) => {
    // have to find a way to compare current target button with different ones and only open specifc menus
    setAnchorElDropdown(event.currentTarget)
    setCurrentOpenDropdown(currMenu)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseDropdown = () => {
    setAnchorElDropdown(null);
    setCurrentOpenDropdown(null)
    handleCloseNavMenu()
  }

  
  const createMenuButton = (menuOptions: string[], index: number) => {
    /*
      Returns a normal MenuItem component if page is just one string, otherwise returns a dropdown menu
      with the dropdown button text as the first string in page and the rest being menu items.
    */
    if (menuOptions.length == 1) {
        const pageText = menuOptions[0]
        return <MenuItem component={Link} to={pageText == "About" ? "/about" : "/"} key={pageText} onClick={handleCloseNavMenu}>
          <Typography textAlign="center">{pageText}</Typography>
        </MenuItem>
    } else {
      const menuName = menuOptions[0]
      return <>
        <MenuItem key={menuName} onClick={(event) => handleOpenDropdown(event, index)}>
          <Typography textAlign="center">{menuName}</Typography>
        </MenuItem>
        <Menu
          anchorEl={anchorElDropdown}
          open={currentOpenDropdown == index}
          onClose={handleCloseDropdown}
          // Change where menu appears based on if it is in long menu mode or menu button mode
          anchorOrigin={Boolean(anchorElNav) ? 
            {vertical: 'top', horizontal: 'right'} : 
            {vertical: 'bottom', horizontal: 'left'}}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}>
            
            {menuOptions.slice(1, menuOptions.length).map((buttonText) => 
                <MenuItem onClick={handleCloseDropdown}>{buttonText}</MenuItem>)}
        
        </Menu>
      </>
    }
    
  }

  
  return (
    <Router>
    <AppBar position="sticky" color="primary">
      <Container maxWidth="xl">
        {/* Toolbar is how everything knows how to be formatted */}
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          {/* TODO: edit logo here */}
          <Typography
            variant="h6"
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
            LOGO
          </Typography>

          {/* TODO: maybe only show account button if someone has logged in? */}
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
              {pages.map(createMenuButton)}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(createMenuButton)}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    
    <FadeTransition>
    <Routes>
    <Route path="/about" element={AboutPage()} />
    </Routes>
    </FadeTransition>

    </Router>
    
  );
}
export default ResponsiveAppBar;