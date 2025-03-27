# AnthroCalc Pro - Frontend

Este directorio contiene la aplicación frontend de AnthroCalc Pro, desarrollada con React y Material UI.

## Características

- Interfaz de usuario moderna y responsiva con Material UI
- Formularios validados con Formik y Yup
- Visualización de datos con Chart.js
- Comunicación con API RESTful en el backend

## Estructura del Proyecto

```
frontend/
├── public/              # Archivos públicos
│   ├── index.html       # HTML base
│   └── manifest.json    # Manifiesto PWA
├── src/                 # Código fuente
│   ├── components/      # Componentes React
│   │   ├── BasicMetricsPanel.js    # Panel de métricas básicas
│   │   ├── BodyCompositionPanel.js # Panel de composición corporal
│   │   ├── RecommendationsPanel.js # Panel de recomendaciones
│   │   ├── Header.js               # Componente de encabezado
│   │   ├── Footer.js               # Componente de pie de página
│   │   ├── InputForm.js            # Formulario de entrada
│   │   └── Results.js              # Visualización de resultados
│   ├── services/        # Servicios para comunicación con API
│   │   └── api.js       # Cliente API
│   ├── utils/           # Utilidades
│   │   └── anthropometryUtils.js  # Funciones de cálculo antropométrico
│   ├── App.js           # Componente principal
│   └── index.js         # Punto de entrada
└── package.json         # Dependencias y scripts
```

## Instalación y Ejecución

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar en modo desarrollo:
```bash
npm start
```

3. Construir para producción:
```bash
npm run build
```

## Despliegue en GitHub Pages

1. Asegúrate de tener instalada la dependencia gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Actualiza la propiedad "homepage" en package.json:
```json
"homepage": "https://TU-USUARIO.github.io/anthrocalc-pro",
```

3. Despliega a GitHub Pages:
```bash
npm run deploy
```

4. Verifica el despliegue visitando https://TU-USUARIO.github.io/anthrocalc-pro

## Conexión con el Backend

Por defecto, en desarrollo la aplicación se conecta a `http://localhost:5000/api`.
En producción, se conecta a la URL de Heroku configurada en `src/services/api.js`.

Si cambias la URL del backend, actualiza esta configuración en `src/services/api.js`.
