import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, CssBaseline, Box, Typography, Paper } from '@mui/material';
import InputForm from './components/InputForm';
import Results from './components/Results';
import Header from './components/Header';
import Footer from './components/Footer';

// Definición del tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#388e3c',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
  },
});

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Función para manejar el envío del formulario
  const handleFormSubmit = (calculatedResults) => {
    setResults(calculatedResults);
    setLoading(false);
    setError(null);
  };
  
  // Función para manejar errores en el formulario
  const handleFormError = (errorMsg) => {
    setError(errorMsg);
    setLoading(false);
    setResults(null);
  };
  
  // Función para manejar el inicio del procesamiento
  const handleFormProcessing = () => {
    setLoading(true);
    setError(null);
  };
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header />
        
        <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Calculadora Antropométrica Avanzada
          </Typography>
          
          <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary">
            Basada en protocolos ISAK y ecuaciones validadas científicamente
          </Typography>
          
          <Box sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
              <InputForm 
                onSubmit={handleFormSubmit}
                onError={handleFormError}
                onProcessing={handleFormProcessing}
              />
            </Paper>
            
            {(loading || results || error) && (
              <Paper elevation={3} sx={{ p: 3 }}>
                <Results 
                  results={results}
                  loading={loading}
                  error={error}
                />
              </Paper>
            )}
          </Box>
        </Container>
        
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;