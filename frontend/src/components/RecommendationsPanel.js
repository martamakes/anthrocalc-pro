import React from 'react';
import { 
  Box, Typography, Grid, Card, CardContent, CardHeader,
  List, ListItem, ListItemIcon, ListItemText, Divider,
  Paper, Alert
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SpaIcon from '@mui/icons-material/Spa';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Mapeo de recomendaciones predefinidas según el objetivo
const recommendationsMap = {
  "Reducción visceral": {
    nutrition: [
      "Déficit calórico moderado (15-20%)",
      "Enfoque en alimentos con bajo índice glucémico",
      "Priorizar proteínas (2g/kg) y grasas saludables",
      "Considerar ayuno intermitente 16/8"
    ],
    training: [
      "3-4 sesiones semanales HIIT",
      "2-3 sesiones semanales de fuerza",
      "Monitorizar perímetro abdominal semanalmente"
    ],
    supplements: [
      "Omega-3 (2-4g/día)",
      "Té verde o EGCG",
      "Considerar L-carnitina pre-entrenamiento"
    ]
  },
  "Hipertrofia": {
    nutrition: [
      "Superávit calórico moderado (250-500 kcal)",
      "Proteínas: 2.2-2.5g/kg de peso",
      "Distribución de proteínas: 4-5 comidas",
      "Carbohidratos peri-entrenamiento"
    ],
    training: [
      "Entrenamiento de fuerza 4-5 días/semana",
      "Enfoque en hipertrofia (8-12 repeticiones)",
      "Programación con sobrecarga progresiva",
      "Descanso óptimo entre series (60-90s)"
    ],
    supplements: [
      "Creatina monohidrato (5g/día)",
      "Proteína de suero post-entrenamiento",
      "Considerar beta-alanina para entrenamientos intensos"
    ]
  },
  "Recomposición avanzada": {
    nutrition: [
      "Mantenimiento calórico con ciclado nutricional",
      "Superávit en días de entrenamiento (+10%)",
      "Déficit en días de descanso (-10%)",
      "Proteínas elevadas constantes (2.2g/kg)"
    ],
    training: [
      "Entrenamiento mixto: fuerza-metabólico",
      "Periodización ondulante",
      "Incluir entrenamiento concurrente estratégico",
      "Monitorizar rendimiento y recuperación"
    ],
    supplements: [
      "Creatina (5g/día)",
      "Cafeína pre-entrenamiento",
      "Proteína de digestión rápida y lenta"
    ]
  },
  "Plan estándar": {
    nutrition: [
      "Balance calórico ajustado a objetivo específico",
      "Distribución macronutrientes balanceada",
      "Enfoque en calidad nutricional",
      "Hidratación óptima (35ml/kg)"
    ],
    training: [
      "Programa combinado fuerza-resistencia",
      "3-4 sesiones semanales",
      "Progresión gradual de intensidad",
      "Incluir componente de movilidad y flexibilidad"
    ],
    supplements: [
      "Multivitamínico básico",
      "Proteína de suero si es necesario",
      "Considerar creatina según objetivos específicos"
    ]
  }
};

const RecommendationsPanel = ({ goal }) => {
  if (!goal || !goal.primary_goal) {
    return (
      <Alert severity="info">
        No hay recomendaciones específicas disponibles con los datos proporcionados.
      </Alert>
    );
  }

  // Obtener las recomendaciones específicas para el objetivo principal
  const primaryGoal = goal.primary_goal;
  const recommendations = recommendationsMap[primaryGoal] || {};

  return (
    <Box>
      <Paper elevation={0} sx={{ p: 2, mb: 3, backgroundColor: 'primary.light' }}>
        <Typography variant="h5" color="white" gutterBottom>
          {primaryGoal}
        </Typography>
        <Typography variant="body1" color="white">
          {goal.description}
        </Typography>
        
        {goal.caloric_deficit && (
          <Typography variant="body2" color="white" sx={{ mt: 1 }}>
            Déficit calórico recomendado: {goal.caloric_deficit}%
          </Typography>
        )}
        
        {goal.caloric_surplus && (
          <Typography variant="body2" color="white" sx={{ mt: 1 }}>
            Superávit calórico recomendado: {goal.caloric_surplus} kcal/día
          </Typography>
        )}
        
        {goal.caloric_strategy && (
          <Typography variant="body2" color="white" sx={{ mt: 1 }}>
            Estrategia calórica: {goal.caloric_strategy}
          </Typography>
        )}
      </Paper>
      
      <Grid container spacing={3}>
        {/* Recomendaciones nutricionales */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardHeader
              title="Nutrición"
              avatar={<RestaurantIcon />}
              titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
              <List dense>
                {recommendations.nutrition?.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Recomendaciones de entrenamiento */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardHeader
              title="Entrenamiento"
              avatar={<FitnessCenterIcon />}
              titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
              <List dense>
                {recommendations.training?.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Recomendaciones de suplementación */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardHeader
              title="Suplementación"
              avatar={<SpaIcon />}
              titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
              <List dense>
                {recommendations.supplements?.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="caption" color="text.secondary">
                Nota: La suplementación debe ser personalizada según necesidades específicas y solo después de optimizar la alimentación y el entrenamiento.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RecommendationsPanel;