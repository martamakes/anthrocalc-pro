# AnthroCalc Pro - Aplicación de Cálculos Antropométricos

## Descripción

AnthroCalc Pro es una aplicación web moderna para realizar cálculos antropométricos avanzados según los protocolos ISAK y ecuaciones científicamente validadas. Está diseñada para profesionales de la nutrición deportiva, entrenadores personales y deportistas que necesitan evaluaciones precisas de composición corporal.

## Características Principales

- Cálculo de índices básicos (IMC, ICC, ICE)
- Análisis de composición corporal mediante pliegues cutáneos (Jackson-Pollock)
- Determinación de objetivos personalizados basados en parámetros antropométricos
- Recomendaciones nutricionales, de entrenamiento y suplementación
- Visualización gráfica de resultados

## Tecnologías Utilizadas

### Backend
- Python 3.9+
- Flask (API RESTful)
- NumPy (cálculos matemáticos)
- Pandas (manipulación de datos)

### Frontend
- React 18
- Material UI 5 (interfaz de usuario)
- Chart.js (visualización de datos)
- Formik (manejo de formularios)
- Axios (comunicación con API)

## Estructura del Proyecto

```
anthropometry-app/
├── backend/               # Servidor Flask
│   ├── app.py             # Punto de entrada del servidor
│   ├── requirements.txt   # Dependencias de Python
│   ├── models/            # Modelos de datos
│   ├── routes/            # Rutas API
│   └── utils/             # Utilidades y funciones de cálculo
├── frontend/              # Aplicación React
│   ├── public/            # Archivos públicos
│   └── src/               # Código fuente React
│       ├── components/    # Componentes React
│       ├── services/      # Servicios API
│       └── utils/         # Utilidades
└── README.md              # Este archivo
```

## Algoritmos e Índices Implementados

### Índices Básicos
- Índice de Masa Corporal (IMC)
- Índice Cintura-Cadera (ICC)
- Índice Cintura-Estatura (ICE)
- Body Roundness Index (BRI)

### Composición Corporal
- Ecuación de Jackson-Pollock (3 pliegues)
- Índice de Masa Libre de Grasa (IMLG)
- Clasificación por objetivo (Reducción visceral, Hipertrofia, Recomposición)

## Instalación y Ejecución

### Requisitos Previos
- Python 3.9 o superior
- Node.js 14 o superior
- npm 6 o superior

### Configuración del Backend
1. Navegar al directorio del backend
```bash
cd anthropometry-app/backend
```

2. Crear un entorno virtual
```bash
python -m venv venv
```

3. Activar el entorno virtual
```bash
# En Windows
venv\Scripts\activate
# En macOS/Linux
source venv/bin/activate
```

4. Instalar dependencias
```bash
pip install -r requirements.txt
```

5. Ejecutar el servidor de desarrollo
```bash
python app.py
```

### Configuración del Frontend
1. Navegar al directorio del frontend
```bash
cd anthropometry-app/frontend
```

2. Instalar dependencias
```bash
npm install
```

3. Ejecutar el servidor de desarrollo
```bash
npm start
```

## Uso

1. Acceder a la aplicación en `http://localhost:3000`
2. Completar el formulario con los datos antropométricos
3. Para cálculos básicos, los campos obligatorios son sexo, edad, peso, estatura, circunferencia de cintura y cadera
4. Para cálculos de composición corporal, completar los pliegues cutáneos (tríceps, subescapular, suprailíaco)
5. Hacer clic en "Calcular Resultados" para obtener el análisis

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - vea el archivo LICENSE para más detalles.

## Contacto

Para preguntas técnicas o soporte, contacte al desarrollador a través de [email@ejemplo.com](mailto:marta.vigara.gonzalez@gmail.com).