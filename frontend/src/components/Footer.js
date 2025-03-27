import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {new Date().getFullYear()}
          {' AnthroCalc Pro. Desarrollado con '}
          <Link color="inherit" href="https://reactjs.org/">
            React
          </Link>
          {' y '}
          <Link color="inherit" href="https://flask.palletsprojects.com/">
            Flask
          </Link>
          {'.'}
        </Typography>
        <Typography variant="caption" color="text.secondary" align="center" display="block" sx={{ mt: 1 }}>
          Basado en los protocolos ISAK y fórmulas científicamente validadas. 
          Resultados para fines informativos, no reemplazan la evaluación profesional.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;