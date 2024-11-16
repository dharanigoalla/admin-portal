import React, { useState } from "react";
import { AppBar, Toolbar, Button, Drawer, MenuItem, Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export const MainMenu = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate(); 
  
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleMenuSelect = (option) => {
    setDrawerOpen(false);

    if (option === 'services') {
      navigate("/services");
    } else if (option === 'providers') {
      navigate("/providers");
    }
  };

  return (
    <AppBar position="static" sx={{ background: 'black' }}>
      <Toolbar>
        <Button
          className="justify-center"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          onClick={handleDrawerOpen}
        >
          <MenuIcon sx={{ color: 'white' }} />
        </Button>
        
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={handleDrawerClose}
          sx={{ ".MuiDrawer-paper": { width: 300, backgroundColor: "black" } }}
        >
          <Box
            sx={{
              backgroundColor: 'black',
              height: '100%',
              width: '300px',
              position: 'relative'
            }}
            role="presentation"
          >
            <IconButton
              onClick={handleDrawerClose}
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                color: 'white',
                margin: 1
              }}
            >
              <CloseIcon />
            </IconButton>

            <Box sx={{ marginTop: 4 }}>
              <MenuItem sx={{ color: 'white', marginTop: 2 }} onClick={() => handleMenuSelect('services')}>
                Services
              </MenuItem>
              <MenuItem sx={{ color: 'white', marginTop: 2 }} onClick={() => handleMenuSelect('providers')}>
                Providers
              </MenuItem>
            </Box>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};
