/**
 * Utilidades para cálculos y visualización de datos antropométricos
 */

// Función para determinar el estado de un valor según los umbrales
export const getStatusFromValue = (value, thresholds) => {
    if (!value || !thresholds) return 'neutral';
    
    if (value <= thresholds.optimal.max && value >= thresholds.optimal.min) {
      return 'optimal';
    } else if (
      (value <= thresholds.warning.max && value >= thresholds.warning.min) || 
      (value >= thresholds.warning.min && thresholds.warning.max === null) ||
      (value <= thresholds.warning.max && thresholds.warning.min === null)
    ) {
      return 'warning';
    } else {
      return 'alert';
    }
  };
  
  // Definición de umbrales para diferentes métricas antropométricas
  export const getThresholds = (gender) => {
    return {
      bmi: {
        optimal: { min: 18.5, max: 24.9 },
        warning: { min: 25, max: 29.9 },
      },
      waist_hip_ratio: {
        M: {
          optimal: { min: 0, max: 0.90 },
          warning: { min: 0.9, max: 1.0 },
        },
        F: {
          optimal: { min: 0, max: 0.85 },
          warning: { min: 0.85, max: 0.95 },
        }
      },
      waist_height_ratio: {
        optimal: { min: 0, max: 0.5 },
        warning: { min: 0.5, max: 0.6 },
      },
      body_fat_percentage: {
        M: {
          optimal: { min: 8, max: 19 },
          warning: { min: 20, max: 24 },
        },
        F: {
          optimal: { min: 15, max: 25 },
          warning: { min: 26, max: 31 },
        }
      },
      fat_free_mass_index: {
        M: {
          optimal: { min: 19, max: 25 },
          warning: { min: 17, max: 18.9 },
        },
        F: {
          optimal: { min: 15, max: 22 },
          warning: { min: 13, max: 14.9 },
        }
      }
    };
  };
  
  // Funcion para interpretar el IMC
  export const interpretBMI = (bmi) => {
    if (bmi < 16) return { label: 'Delgadez severa', color: 'error' };
    if (bmi < 17) return { label: 'Delgadez moderada', color: 'error' };
    if (bmi < 18.5) return { label: 'Delgadez leve', color: 'warning' };
    if (bmi < 25) return { label: 'Normopeso', color: 'success' };
    if (bmi < 30) return { label: 'Sobrepeso', color: 'warning' };
    if (bmi < 35) return { label: 'Obesidad grado I', color: 'error' };
    if (bmi < 40) return { label: 'Obesidad grado II', color: 'error' };
    return { label: 'Obesidad grado III', color: 'error' };
  };
  
  // Función para interpretar el índice cintura-cadera
  export const interpretWaistHipRatio = (ratio, gender) => {
    if (gender === 'M') {
      if (ratio <= 0.90) return { label: 'Óptimo', color: 'success' };
      if (ratio <= 1.0) return { label: 'Riesgo moderado', color: 'warning' };
      return { label: 'Riesgo alto', color: 'error' };
    } else {
      if (ratio <= 0.85) return { label: 'Óptimo', color: 'success' };
      if (ratio <= 0.95) return { label: 'Riesgo moderado', color: 'warning' };
      return { label: 'Riesgo alto', color: 'error' };
    }
  };
  
  // Función para interpretar el índice cintura-estatura
  export const interpretWaistHeightRatio = (ratio) => {
    if (ratio <= 0.5) return { label: 'Saludable', color: 'success' };
    if (ratio <= 0.6) return { label: 'Riesgo moderado', color: 'warning' };
    return { label: 'Riesgo alto', color: 'error' };
  };
  
  // Función para interpretar el porcentaje de grasa
  export const interpretBodyFatPercentage = (percentage, gender) => {
    if (gender === 'M') {
      if (percentage < 6) return { label: 'Esencial', color: 'warning' };
      if (percentage <= 13) return { label: 'Atlético', color: 'success' };
      if (percentage <= 19) return { label: 'Fitness', color: 'success' };
      if (percentage <= 24) return { label: 'Aceptable', color: 'warning' };
      return { label: 'Elevado', color: 'error' };
    } else {
      if (percentage < 13) return { label: 'Esencial', color: 'warning' };
      if (percentage <= 20) return { label: 'Atlético', color: 'success' };
      if (percentage <= 25) return { label: 'Fitness', color: 'success' };
      if (percentage <= 31) return { label: 'Aceptable', color: 'warning' };
      return { label: 'Elevado', color: 'error' };
    }
  };
  
  // Función para interpretar el índice de masa libre de grasa
  export const interpretFatFreeMassIndex = (ffmi, gender) => {
    if (gender === 'M') {
      if (ffmi < 17) return { label: 'Bajo', color: 'error' };
      if (ffmi < 19) return { label: 'Moderado', color: 'warning' };
      if (ffmi <= 25) return { label: 'Óptimo', color: 'success' };
      return { label: 'Muy elevado', color: 'warning' };
    } else {
      if (ffmi < 13) return { label: 'Bajo', color: 'error' };
      if (ffmi < 15) return { label: 'Moderado', color: 'warning' };
      if (ffmi <= 22) return { label: 'Óptimo', color: 'success' };
      return { label: 'Muy elevado', color: 'warning' };
    }
  };
  
  // Función para calcular el IMC
  export const calculateBMI = (weight, height) => {
    if (!weight || !height) return null;
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  };
  
  // Función para calcular el índice cintura-cadera
  export const calculateWaistHipRatio = (waist, hip) => {
    if (!waist || !hip) return null;
    return (waist / hip).toFixed(2);
  };
  
  // Función para calcular el índice cintura-estatura
  export const calculateWaistHeightRatio = (waist, height) => {
    if (!waist || !height) return null;
    return (waist / height).toFixed(2);
  };