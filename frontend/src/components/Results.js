import React, { useState } from 'react';
import { 
  Box, Typography, Grid, Divider,
  Alert, CircularProgress, Tabs, Tab
} from '@mui/material';

// Importando subcomponentes
import BasicMetricsPanel from './BasicMetricsPanel';
import BodyCompositionPanel from './BodyCompositionPanel';
import RecommendationsPanel from './RecommendationsPanel';
import { getThresholds } from '../utils/AnthropometryUtils';

// Panel de pestañas para diferentes secciones
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`results-tabpanel-${index}`}
      aria-labelledby={`results-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Results = ({ results, loading, error }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Si estamos cargando, mostrar un indicador de progreso
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Si hay un error, mostrarlo
  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {typeof error === 'string' ? error : 'Error al procesar los datos. Verifique los valores ingresados.'}
      </Alert>
    );
  }

  // Si no hay resultados, no mostrar nada
  if (!results) {
    return null;
  }

  // Determinar si tenemos datos completos para todas las pestañas
  const hasBodyComposition = 'body_fat_percentage' in results;
  const hasRecommendations = 'goal' in results;

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Resultados del Análisis
      </Typography>
      
      <Divider sx={{ mb: 2 }} />

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="resultados antropométricos">
          <Tab label="Métricas Básicas" id="tab-0" />
          {hasBodyComposition && <Tab label="Composición Corporal" id="tab-1" />}
          {hasRecommendations && <Tab label="Recomendaciones" id="tab-2" />}
        </Tabs>
      </Box>
      
      <TabPanel value={tabValue} index={0}>
        <BasicMetricsPanel 
          results={results} 
          thresholds={getThresholds(results.gender || 'M')} 
        />
      </TabPanel>
      
      {hasBodyComposition && (
        <TabPanel value={tabValue} index={1}>
          <BodyCompositionPanel 
            results={results} 
            thresholds={getThresholds(results.gender || 'M')} 
          />
        </TabPanel>
      )}
      
      {hasRecommendations && (
        <TabPanel value={tabValue} index={2}>
          <RecommendationsPanel goal={results.goal} />
        </TabPanel>
      )}
    </Box>
  );
};

export default Results;