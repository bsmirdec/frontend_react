import React from 'react';
import { useActionData, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { isUserAdmin } from '../utils/userUtils';
// Material UI
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
import logo from "../assets/cobat-logo.png"
import { useTheme } from '@emotion/react';



const pages = [{adress: 'worksite',name :'Chantier'}, {adress:'command', name:'Commande'}, {adress:'admin', name:'Administration'}];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const theme= useTheme();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    handleCloseUserMenu();
    navigate("/logout")}

  const UserAvatar = ({ firstName, lastName }) => {
    const getInitials = () => {
      const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
      return initials.toUpperCase();
    };
    return (
      <Avatar>
        {getInitials()}
      </Avatar>
    );
  };
  
  

  return (
    <AppBar position="static" style={{backgroundColor: theme.palette.primary.light}}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters>
          <Box component="img" src={logo} alt="Cobat-Constructions" title="Cobat-Constructions"  sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 ,height:"50px"}}/>
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
              paddingLeft: '20px'
            }}
          >
            COBAPP
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
              {pages.map((page) => (
                (page.adress === 'admin' && (!localStorage.getItem('user_permissions') || !isUserAdmin())) ? null : (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                        <Link style={{textDecoration: "none", color: "black"}} to={`/${page.adress}`}>
                            {page.name}
                        </Link>
                    </Typography>
                </MenuItem>
                )
              ))}
            </Menu>
          </Box>
           <Box component="img" src={logo} alt="Cobat-Constructions" title="Cobat-Constructions"  sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 ,height:"50px"}}/>
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
            COBAPP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              (page.adress === 'admin' && (!localStorage.getItem('user_permissions') || !isUserAdmin())) ? null : (
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  <Link style={{textDecoration: "none", color: "white"}} to={`/${page.adress}`}>
                      {page.name}
                  </Link>
                </Button>
              )
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {localStorage.getItem('first_name') ? (
                  <UserAvatar firstName={localStorage.getItem('first_name')} lastName={localStorage.getItem('last_name')}  />
                ) : (
                  <UserAvatar firstName="?" lastName="" />
                  )}
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
              <p style={{ textAlign: 'center', color: 'primary'}}>{localStorage.getItem('first_name')} {localStorage.getItem('last_name')}</p>
              <MenuItem key="account" onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Mon compte</Typography>
              </MenuItem>
              <MenuItem key="logout" onClick={handleLogout}>
                <Typography textAlign="center">Déconnexion</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;