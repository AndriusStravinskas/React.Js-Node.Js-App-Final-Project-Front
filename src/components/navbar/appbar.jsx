import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import SmallNavbar from './small-navbar';
import LargeNavbar from './large-navbar';


function ResponsiveAppBar() {
  

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

        <SmallNavbar />

        <LargeNavbar />

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;