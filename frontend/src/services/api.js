import axios from 'axios';

// URL base para la API
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://anthrocalc-pro-api.herokuapp.com/api' 
  : 'http://localhost:5000/api';

// Configuración de axios
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Servicio para cálculos antropométricos
export const anthropometryService = {
  // Verificar si el servidor está activo
  checkHealth: async () => {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      console.error('Error al verificar estado del servidor:', error);
      throw error;
    }
  },
  
  // Enviar datos para cálculo antropométrico
  calculateAnthropometry: async (data) => {
    try {
      const response = await apiClient.post('/calculate', data);
      return response.data;
    } catch (error) {
      console.error('Error al calcular antropometría:', error);
      throw error;
    }
  },
  
  // Obtener recomendaciones basadas en resultados
  getRecommendations: async (goal) => {
    try {
      const response = await apiClient.post('/recommendations', { goal });
      return response.data;
    } catch (error) {
      console.error('Error al obtener recomendaciones:', error);
      throw error;
    }
  }
};

export default anthropometryService;