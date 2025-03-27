import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { 
  Grid, Typography, Button, Box, 
  TextField, MenuItem, Divider,
  FormControl, FormLabel, RadioGroup,
  FormControlLabel, Radio, Accordion,
  AccordionSummary, AccordionDetails,
  Alert, Tooltip, IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoIcon from '@mui/icons-material/Info';
import { anthropometryService } from '../services/api';

// Esquema de validación con Yup
const validationSchema = Yup.object({
  gender: Yup.string()
    .oneOf(['M', 'F'], 'Seleccione un género válido')
    .required('El género es requerido'),
  age: Yup.number()
    .min(10, 'La edad debe ser mayor a 10 años')
    .max(120, 'La edad debe ser menor a 120 años')
    .required('La edad es requerida'),
  weight: Yup.number()
    .min(30, 'El peso debe ser mayor a 30 kg')
    .max(300, 'El peso debe ser menor a 300 kg')
    .required('El peso es requerido'),
  height: Yup.number()
    .min(100, 'La estatura debe ser mayor a 100 cm')
    .max(250, 'La estatura debe ser menor a 250 cm')
    .required('La estatura es requerida'),
  waist: Yup.number()
    .min(50, 'La circunferencia de cintura debe ser mayor a 50 cm')
    .max(200, 'La circunferencia de cintura debe ser menor a 200 cm')
    .required('La circunferencia de cintura es requerida'),
  hip: Yup.number()
    .min(60, 'La circunferencia de cadera debe ser mayor a 60 cm')
    .max(200, 'La circunferencia de cadera debe ser menor a 200 cm')
    .required('La circunferencia de cadera es requerida'),
  triceps_fold: Yup.number()
    .nullable()
    .transform((value) => (isNaN(value) ? null : value))
    .min(3, 'El pliegue debe ser mayor a 3 mm')
    .max(70, 'El pliegue debe ser menor a 70 mm'),
  subscapular_fold: Yup.number()
    .nullable()
    .transform((value) => (isNaN(value) ? null : value))
    .min(3, 'El pliegue debe ser mayor a 3 mm')
    .max(70, 'El pliegue debe ser menor a 70 mm'),
  thigh_fold: Yup.number()
    .nullable()
    .transform((value) => (isNaN(value) ? null : value))
    .min(3, 'El pliegue debe ser mayor a 3 mm')
    .max(70, 'El pliegue debe ser menor a 70 mm'),
  chest_fold: Yup.number()
    .nullable()
    .transform((value) => (isNaN(value) ? null : value))
    .min(3, 'El pliegue debe ser mayor a 3 mm')
    .max(70, 'El pliegue debe ser menor a 70 mm'),
  abdomen_fold: Yup.number()
    .nullable()
    .transform((value) => (isNaN(value) ? null : value))
    .min(3, 'El pliegue debe ser mayor a 3 mm')
    .max(70, 'El pliegue debe ser menor a 70 mm'),
});

// Valores iniciales del formulario
const initialValues = {
  gender: 'M',
  age: '',
  weight: '',
  height: '',
  waist: '',
  hip: '',
  triceps_fold: '',
  subscapular_fold: '',
  suprailiac_fold: '',
  thigh_fold: '',
  chest_fold: '',
  abdomen_fold: '',
};

const InputForm = ({ onSubmit, onError, onProcessing }) => {
  const [expanded, setExpanded] = useState(false);
  
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      onProcessing();
      
      // Llamada a la API usando el servicio
      const result = await anthropometryService.calculateAnthropometry(values);
      
      if (result.success) {
        onSubmit(result);
      } else {
        onError(result.errors || 'Error en el procesamiento de datos');
      }
    } catch (error) {
      onError(error.response?.data?.errors || 'Error en la conexión');
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, values }) => (
        <Form>
          <Typography variant="h5" component="h2" gutterBottom>
            Datos Básicos
          </Typography>
          
          <Grid container spacing={3}>
            {/* Género */}
            <Grid item xs={12} sm={4}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Género</FormLabel>
                <Field name="gender">
                  {({ field }) => (
                    <RadioGroup
                      row
                      {...field}
                    >
                      <FormControlLabel value="M" control={<Radio />} label="Masculino" />
                      <FormControlLabel value="F" control={<Radio />} label="Femenino" />
                    </RadioGroup>
                  )}
                </Field>
                {touched.gender && errors.gender && (
                  <Alert severity="error">{errors.gender}</Alert>
                )}
              </FormControl>
            </Grid>
            
            {/* Edad */}
            <Grid item xs={12} sm={4}>
              <Field name="age">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Edad"
                    type="number"
                    InputProps={{ inputProps: { min: 10, max: 120 } }}
                    error={touched.age && Boolean(errors.age)}
                    helperText={touched.age && errors.age}
                  />
                )}
              </Field>
            </Grid>
            
            {/* Tipo de Actividad */}
            <Grid item xs={12} sm={4}>
              <Field name="activity_level">
                {({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    label="Nivel de Actividad"
                    defaultValue="moderate"
                  >
                    <MenuItem value="sedentary">Sedentario</MenuItem>
                    <MenuItem value="light">Ligera (1-3 días/semana)</MenuItem>
                    <MenuItem value="moderate">Moderada (3-5 días/semana)</MenuItem>
                    <MenuItem value="intense">Intensa (6-7 días/semana)</MenuItem>
                    <MenuItem value="athlete">Atleta profesional</MenuItem>
                  </TextField>
                )}
              </Field>
            </Grid>
            
            {/* Peso */}
            <Grid item xs={12} sm={4}>
              <Field name="weight">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Peso (kg)"
                    type="number"
                    InputProps={{ inputProps: { min: 30, max: 300, step: 0.1 } }}
                    error={touched.weight && Boolean(errors.weight)}
                    helperText={touched.weight && errors.weight}
                  />
                )}
              </Field>
            </Grid>
            
            {/* Estatura */}
            <Grid item xs={12} sm={4}>
              <Field name="height">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Estatura (cm)"
                    type="number"
                    InputProps={{ inputProps: { min: 100, max: 250, step: 0.1 } }}
                    error={touched.height && Boolean(errors.height)}
                    helperText={touched.height && errors.height}
                  />
                )}
              </Field>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h5" component="h2" gutterBottom>
            Circunferencias
            <Tooltip title="Mediciones en centímetros (cm). Medir según protocolos ISAK.">
              <IconButton size="small" sx={{ ml: 1 }}>
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Typography>
          
          <Grid container spacing={3}>
            {/* Cintura */}
            <Grid item xs={12} sm={6}>
              <Field name="waist">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Circunferencia de Cintura (cm)"
                    type="number"
                    InputProps={{ inputProps: { min: 50, max: 200, step: 0.1 } }}
                    error={touched.waist && Boolean(errors.waist)}
                    helperText={touched.waist && errors.waist}
                  />
                )}
              </Field>
            </Grid>
            
            {/* Cadera */}
            <Grid item xs={12} sm={6}>
              <Field name="hip">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Circunferencia de Cadera (cm)"
                    type="number"
                    InputProps={{ inputProps: { min: 60, max: 200, step: 0.1 } }}
                    error={touched.hip && Boolean(errors.hip)}
                    helperText={touched.hip && errors.hip}
                  />
                )}
              </Field>
            </Grid>
          </Grid>
          
          <Accordion
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
            sx={{ mt: 3 }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
                Pliegues Cutáneos (Opcional)
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary" paragraph>
                Mediciones en milímetros (mm). Para cálculos de composición corporal según Jackson-Pollock.
              </Typography>
              
              {values.gender === 'M' ? (
                <>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    Para hombres, la fórmula de Jackson-Pollock de 3 pliegues utiliza: pecho, abdomen y muslo.
                  </Alert>
                  
                  <Grid container spacing={3}>
                    {/* Pecho */}
                    <Grid item xs={12} sm={4}>
                      <Field name="chest_fold">
                        {({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Pliegue Pecho (mm)"
                            type="number"
                            InputProps={{ inputProps: { min: 3, max: 70, step: 0.1 } }}
                            error={touched.chest_fold && Boolean(errors.chest_fold)}
                            helperText={touched.chest_fold && errors.chest_fold}
                          />
                        )}
                      </Field>
                    </Grid>
                    
                    {/* Abdomen */}
                    <Grid item xs={12} sm={4}>
                      <Field name="abdomen_fold">
                        {({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Pliegue Abdomen (mm)"
                            type="number"
                            InputProps={{ inputProps: { min: 3, max: 70, step: 0.1 } }}
                            error={touched.abdomen_fold && Boolean(errors.abdomen_fold)}
                            helperText={touched.abdomen_fold && errors.abdomen_fold}
                          />
                        )}
                      </Field>
                    </Grid>
                    
                    {/* Muslo */}
                    <Grid item xs={12} sm={4}>
                      <Field name="thigh_fold">
                        {({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Pliegue Muslo (mm)"
                            type="number"
                            InputProps={{ inputProps: { min: 3, max: 70, step: 0.1 } }}
                            error={touched.thigh_fold && Boolean(errors.thigh_fold)}
                            helperText={touched.thigh_fold && errors.thigh_fold}
                          />
                        )}
                      </Field>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    Para mujeres, la fórmula de Jackson-Pollock de 3 pliegues utiliza: tríceps, suprailíaco y muslo.
                  </Alert>
                  
                  <Grid container spacing={3}>
                    {/* Tríceps */}
                    <Grid item xs={12} sm={4}>
                      <Field name="triceps_fold">
                        {({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Pliegue Tríceps (mm)"
                            type="number"
                            InputProps={{ inputProps: { min: 3, max: 70, step: 0.1 } }}
                            error={touched.triceps_fold && Boolean(errors.triceps_fold)}
                            helperText={touched.triceps_fold && errors.triceps_fold}
                          />
                        )}
                      </Field>
                    </Grid>
                    
                    {/* Suprailíaco */}
                    <Grid item xs={12} sm={4}>
                      <Field name="suprailiac_fold">
                        {({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Pliegue Suprailíaco (mm)"
                            type="number"
                            InputProps={{ inputProps: { min: 3, max: 70, step: 0.1 } }}
                            error={touched.suprailiac_fold && Boolean(errors.suprailiac_fold)}
                            helperText={touched.suprailiac_fold && errors.suprailiac_fold}
                          />
                        )}
                      </Field>
                    </Grid>
                    
                    {/* Muslo */}
                    <Grid item xs={12} sm={4}>
                      <Field name="thigh_fold">
                        {({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Pliegue Muslo (mm)"
                            type="number"
                            InputProps={{ inputProps: { min: 3, max: 70, step: 0.1 } }}
                            error={touched.thigh_fold && Boolean(errors.thigh_fold)}
                            helperText={touched.thigh_fold && errors.thigh_fold}
                          />
                        )}
                      </Field>
                    </Grid>
                  </Grid>
                </>
              )}
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="body2" sx={{ mb: 2 }}>
                Pliegues alternativos (opcional para fórmulas genéricas):
              </Typography>
              
              <Grid container spacing={3}>
                {values.gender === 'M' && (
                  <>
                    {/* Tríceps (alternativo para hombres) */}
                    <Grid item xs={12} sm={4}>
                      <Field name="triceps_fold">
                        {({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Pliegue Tríceps (mm)"
                            type="number"
                            InputProps={{ inputProps: { min: 3, max: 70, step: 0.1 } }}
                            error={touched.triceps_fold && Boolean(errors.triceps_fold)}
                            helperText={touched.triceps_fold && errors.triceps_fold}
                          />
                        )}
                      </Field>
                    </Grid>
                    
                    {/* Subescapular (alternativo para hombres) */}
                    <Grid item xs={12} sm={4}>
                      <Field name="subscapular_fold">
                        {({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Pliegue Subescapular (mm)"
                            type="number"
                            InputProps={{ inputProps: { min: 3, max: 70, step: 0.1 } }}
                            error={touched.subscapular_fold && Boolean(errors.subscapular_fold)}
                            helperText={touched.subscapular_fold && errors.subscapular_fold}
                          />
                        )}
                      </Field>
                    </Grid>
                    
                    {/* Suprailíaco (alternativo para hombres) */}
                    <Grid item xs={12} sm={4}>
                      <Field name="suprailiac_fold">
                        {({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Pliegue Suprailíaco (mm)"
                            type="number"
                            InputProps={{ inputProps: { min: 3, max: 70, step: 0.1 } }}
                            error={touched.suprailiac_fold && Boolean(errors.suprailiac_fold)}
                            helperText={touched.suprailiac_fold && errors.suprailiac_fold}
                          />
                        )}
                      </Field>
                    </Grid>
                  </>
                )}
                
                {values.gender === 'F' && (
                  <>
                    {/* Subescapular (alternativo para mujeres) */}
                    <Grid item xs={12} sm={6}>
                      <Field name="subscapular_fold">
                        {({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Pliegue Subescapular (mm)"
                            type="number"
                            InputProps={{ inputProps: { min: 3, max: 70, step: 0.1 } }}
                            error={touched.subscapular_fold && Boolean(errors.subscapular_fold)}
                            helperText={touched.subscapular_fold && errors.subscapular_fold}
                          />
                        )}
                      </Field>
                    </Grid>
                  </>
                )}
              </Grid>
              
              <Box sx={{ mt: 2 }}>
                <Alert severity="info">
                  Para cálculos precisos de composición corporal, se recomienda completar los tres pliegues específicos para su género.
                </Alert>
              </Box>
            </AccordionDetails>
          </Accordion>
          
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Procesando...' : 'Calcular Resultados'}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default InputForm;