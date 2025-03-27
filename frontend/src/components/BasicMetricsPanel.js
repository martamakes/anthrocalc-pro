import React from 'react';
import { 
  Box, Typography, Grid, Card, CardContent, CardHeader,
  Chip, Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { getStatusFromValue } from '../utils/AnthropometryUtils';

// Componente estilizado para métricas
const MetricCard = styled(Card)(({ theme, status }) => ({
  height: '100%',
  backgroundColor: 
    status === 'optimal' ? 'rgba(46, 125, 50, 0.08)' :
    status === 'warning' ? 'rgba(237, 108, 2, 0.08)' :
    status === 'alert' ? 'rgba(211, 47, 47, 0.08)' : 'inherit',
}));

const BasicMetricsPanel = ({ results, thresholds }) => {
  const gender = results.gender || 'M';

  return (
    <Box>
      <Grid container spacing={3}>
        {/* IMC */}
        <Grid item xs={12} sm={6} md={4}>
          <MetricCard 
            status={getStatusFromValue(results.bmi, thresholds.bmi)}
            elevation={3}
          >
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h6">IMC</Typography>
                  <Tooltip title="Índice de Masa Corporal. Relaciona el peso con la estatura.">
                    <HelpOutlineIcon fontSize="small" sx={{ ml: 1 }} />
                  </Tooltip>
                </Box>
              }
              subheader="Índice de Masa Corporal"
              titleTypographyProps={{ variant: 'h6' }}
              subheaderTypographyProps={{ variant: 'body2' }}
            />
            <CardContent>
              <Typography variant="h4" component="div" align="center">
                {results.bmi}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                kg/m²
              </Typography>
              <Box sx={{ mt: 1, textAlign: 'center' }}>
                <Chip 
                  label={
                    results.bmi < 18.5 ? 'Bajo peso' :
                    results.bmi < 25 ? 'Normopeso' :
                    results.bmi < 30 ? 'Sobrepeso' : 'Obesidad'
                  }
                  color={
                    results.bmi < 18.5 ? 'warning' :
                    results.bmi < 25 ? 'success' :
                    results.bmi < 30 ? 'warning' : 'error'
                  }
                  size="small"
                />
              </Box>
            </CardContent>
          </MetricCard>
        </Grid>

        {/* ICC */}
        <Grid item xs={12} sm={6} md={4}>
          <MetricCard 
            status={getStatusFromValue(
              results.waist_hip_ratio, 
              thresholds.waist_hip_ratio[gender]
            )}
            elevation={3}
          >
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h6">ICC</Typography>
                  <Tooltip title="Índice Cintura-Cadera. Relación entre circunferencia de cintura y cadera.">
                    <HelpOutlineIcon fontSize="small" sx={{ ml: 1 }} />
                  </Tooltip>
                </Box>
              }
              subheader="Índice Cintura-Cadera"
              titleTypographyProps={{ variant: 'h6' }}
              subheaderTypographyProps={{ variant: 'body2' }}
            />
            <CardContent>
              <Typography variant="h4" component="div" align="center">
                {results.waist_hip_ratio}
              </Typography>
              <Box sx={{ mt: 1, textAlign: 'center' }}>
                <Chip 
                  label={
                    (gender === 'M' && results.waist_hip_ratio <= 0.90) || 
                    (gender === 'F' && results.waist_hip_ratio <= 0.85) 
                      ? 'Óptimo' : 'Riesgo incrementado'
                  }
                  color={
                    (gender === 'M' && results.waist_hip_ratio <= 0.90) || 
                    (gender === 'F' && results.waist_hip_ratio <= 0.85) 
                      ? 'success' : 'warning'
                  }
                  size="small"
                />
              </Box>
            </CardContent>
          </MetricCard>
        </Grid>

        {/* ICE */}
        <Grid item xs={12} sm={6} md={4}>
          <MetricCard 
            status={getStatusFromValue(results.waist_height_ratio, thresholds.waist_height_ratio)}
            elevation={3}
          >
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h6">ICE</Typography>
                  <Tooltip title="Índice Cintura-Estatura. Relación entre circunferencia de cintura y estatura.">
                    <HelpOutlineIcon fontSize="small" sx={{ ml: 1 }} />
                  </Tooltip>
                </Box>
              }
              subheader="Índice Cintura-Estatura"
              titleTypographyProps={{ variant: 'h6' }}
              subheaderTypographyProps={{ variant: 'body2' }}
            />
            <CardContent>
              <Typography variant="h4" component="div" align="center">
                {results.waist_height_ratio}
              </Typography>
              <Box sx={{ mt: 1, textAlign: 'center' }}>
                <Chip 
                  label={results.waist_height_ratio <= 0.5 ? 'Saludable' : 'Riesgo cardiovascular'}
                  color={results.waist_height_ratio <= 0.5 ? 'success' : 'warning'}
                  size="small"
                />
              </Box>
            </CardContent>
          </MetricCard>
        </Grid>

        {/* BRI */}
        <Grid item xs={12} sm={6} md={4}>
          <MetricCard elevation={3}>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h6">BRI</Typography>
                  <Tooltip title="Body Roundness Index. Índice de redondez corporal.">
                    <HelpOutlineIcon fontSize="small" sx={{ ml: 1 }} />
                  </Tooltip>
                </Box>
              }
              subheader="Body Roundness Index"
              titleTypographyProps={{ variant: 'h6' }}
              subheaderTypographyProps={{ variant: 'body2' }}
            />
            <CardContent>
              <Typography variant="h4" component="div" align="center">
                {results.body_roundness_index}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                Valores más altos indican mayor riesgo cardiometabólico
              </Typography>
            </CardContent>
          </MetricCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BasicMetricsPanel;