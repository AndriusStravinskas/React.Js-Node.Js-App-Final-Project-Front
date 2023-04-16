import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MessageIcon from '@mui/icons-material/Message';
import { pages, settings, userLoginPage } from './navbar-data';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NavigationContext } from '../../helpers/navigation-context';


const LargeNavbar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const nav = useNavigate();
  const { myUser } = useSelector((state) => state.user);
  const { navigate } = React.useContext(NavigationContext);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <>

      

<MessageIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
          CHAT
        </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {!myUser.loggedIn ? (pages.map((page) => (
              <Button
                key={page.title}
                onClick={() => nav(page.path)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.title}
              </Button>
            )))
              : (userLoginPage.map((page) => (
                <Button
                  key={page.title}
                  onClick={() => nav(page.path)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.title}
                </Button>
              )))}
          </Box>

          {myUser.loggedIn && (
          <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            textAlign: 'center', 
            flexGrow: 0,
            gap: '1rem',
          }}
          >
            <Typography sx={{ display: { xs: 'flex', md: 'flex' } }}>
              {myUser.user.username}
            </Typography>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={myUser.user.avatarImage} />
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
                <MenuItem 
                key={setting.title} 
                onClick={setting.handle ? setting.handle : () => navigate(setting.path)}
                >
                  <Typography textAlign="center">{setting.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>)}

    </>
  );
};

export default LargeNavbar;