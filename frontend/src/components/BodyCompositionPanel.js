import React from 'react';
import { 
  Box, Typography, Grid, Card, CardContent, CardHeader,
  Chip, Tooltip, Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { getStatusFromValue } from '../../utils/anthropometryUtils';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Registramos los componentes que necesitamos para Chart.js
ChartJS.register(
  ArcElement,
  ChartTooltip,
  Legend
);

// Componente estilizado para métricas
const MetricCard = styled(Card)(({ theme, status }) => ({
  height: '100%',
  backgroundColor: 
    status === 'optimal' ? 'rgba(46, 125, 50, 0.08)' :
    status === 'warning' ? 'rgba(237, 108, 2, 0.08)' :
    status === 'alert' ? 'rgba(211, 47, 47, 0.08)' : 'inherit',
}));

const BodyCompositionPanel = ({ results, thresholds }) => {
  const gender = results.gender || 'M';

  // Datos para el gráfico circular de composición corporal
  const pieData = {
    labels: ['Masa Grasa', 'Masa Libre de Grasa'],
    datasets: [
      {
        data: [results.fat_mass, results.fat_free_mass],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Opciones para el gráfico
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = context.raw / results.weight * 100;
            return `${label}: ${value.toFixed(1)} kg (${percentage.toFixed(1)}%)`;
          }
        }
      }
    },
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={3}>
            {/* Porcentaje de Grasa */}
            <Grid item xs={12}>
              <MetricCard 
                status={getStatusFromValue(
                  results.body_fat_percentage, 
                  thresholds.body_fat_percentage[gender]
                )}
                elevation={3}
              >
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="h6">% Grasa Corporal</Typography>
                      <Tooltip title="Porcentaje de grasa corporal según Jackson-Pollock de 3 pliegues.">
                        <HelpOutlineIcon fontSize="small" sx={{ ml: 1 }} />
                      </Tooltip>
                    </Box>
                  }
                  subheader="Basado en pliegues cutáneos"
                  titleTypographyProps={{ variant: 'h6' }}
                  subheaderTypographyProps={{ variant: 'body2' }}
                />
                <CardContent>
                  <Typography variant="h4" component="div" align="center">
                    {results.body_fat_percentage}%
                  </Typography>
                  <Box sx={{ mt: 1, textAlign: 'center' }}>
                    <Chip 
                      label={
                        gender === 'M' ? 
                          (results.body_fat_percentage < 8 ? 'Muy bajo' :
                           results.body_fat_percentage <= 19 ? 'Óptimo' :
                           results.body_fat_percentage <= 24 ? 'Moderado' : 'Elevado') :
                          (results.body_fat_percentage < 15 ? 'Muy bajo' :
                           results.body_fat_percentage <= 25 ? 'Óptimo' :
                           results.body_fat_percentage <= 31 ? 'Moderado' : 'Elevado')
                      }
                      color={
                        gender === 'M' ? 
                          (results.body_fat_percentage < 8 ? 'warning' :
                           results.body_fat_percentage <= 19 ? 'success' :
                           results.body_fat_percentage <= 24 ? 'warning' : 'error') :
                          (results.body_fat_percentage < 15 ? 'warning' :
                           results.body_fat_percentage <= 25 ? 'success' :
                           results.body_fat_percentage <= 31 ? 'warning' : 'error')
                      }
                      size="small"
                    />
                  </Box>
                </CardContent>
              </MetricCard>
            </Grid>

            {/* Índice de Masa Libre de Grasa */}
            <Grid item xs={12}>
              <MetricCard 
                status={getStatusFromValue(
                  results.fat_free_mass_index, 
                  thresholds.fat_free_mass_index[gender]
                )}
                elevation={3}
              >
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="h6">IMLG</Typography>
                      <Tooltip title="Índice de Masa Libre de Grasa. Indicador de desarrollo muscular relativo a la estatura.">
                        <HelpOutlineIcon fontSize="small" sx={{ ml: 1 }} />
                      </Tooltip>
                    </Box>
                  }
                  subheader="Índice de Masa Libre de Grasa"
                  titleTypographyProps={{ variant: 'h6' }}
                  subheaderTypographyProps={{ variant: 'body2' }}
                />
                <CardContent>
                  <Typography variant="h4" component="div" align="center">
                    {results.fat_free_mass_index}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    kg/m²
                  </Typography>
                  <Box sx={{ mt: 1, textAlign: 'center' }}>
                    <Chip 
                      label={
                        gender === 'M' ? 
                          (results.fat_free_mass_index < 17 ? 'Bajo' :
                           results.fat_free_mass_index < 19 ? 'Moderado' :
                           results.fat_free_mass_index <= 25 ? 'Óptimo' : 'Elevado') :
                          (results.fat_free_mass_index < 13 ? 'Bajo' :
                           results.fat_free_mass_index < 15 ? 'Moderado' :
                           results.fat_free_mass_index <= 22 ? 'Óptimo' : 'Elevado')
                      }
                      color={
                        gender === 'M' ? 
                          (results.fat_free_mass_index < 17 ? 'error' :
                           results.fat_free_mass_index < 19 ? 'warning' :
                           results.fat_free_mass_index <= 25 ? 'success' : 'warning') :
                          (results.fat_free_mass_index < 13 ? 'error' :
                           results.fat_free_mass_index < 15 ? 'warning' :
                           results.fat_free_mass_index <= 22 ? 'success' : 'warning')
                      }
                      size="small"
                    />
                  </Box>
                </CardContent>
              </MetricCard>
            </Grid>
          </Grid>
        </Grid>

        {/* Gráfico de composición corporal */}
        <Grid item xs={12} sm={6}>
          <Card elevation={3} sx={{ height: '100%' }}>
            <CardHeader
              title="Composición Corporal"
              subheader={`Peso Total: ${results.weight} kg`}
              titleTypographyProps={{ variant: 'h6' }}
              subheaderTypographyProps={{ variant: 'body2' }}
            />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <Pie data={pieData} options={pieOptions} />
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" align="center">
                    Masa Grasa
                  </Typography>
                  <Typography variant="h6" align="center" color="error">
                    {results.fat_mass} kg
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" align="center">
                    Masa Libre de Grasa
                  </Typography>
                  <Typography variant="h6" align="center" color="primary">
                    {results.fat_free_mass} kg
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BodyCompositionPanel;