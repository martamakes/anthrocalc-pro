import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useTheme, useMediaQuery } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import InfoIcon from '@mui/icons-material/Info';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static">
      <Toolbar>
        <FitnessCenterIcon sx={{ mr: 2 }} />
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AnthroCalc Pro
        </Typography>
        
        {!isMobile && (
          <Box>
            <Button color="inherit" startIcon={<InfoIcon />}>
              Acerca de
            </Button>
            <Button color="inherit" startIcon={<MenuBookIcon />}>
              Guía
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;