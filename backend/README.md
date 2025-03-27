# AnthroCalc Pro - Backend

Este directorio contiene el backend API RESTful de AnthroCalc Pro, desarrollado con Flask.

## Características

- API RESTful para cálculos antropométricos
- Implementación de fórmulas validadas científicamente (Jackson-Pollock, etc.)
- Validación de datos y manejo de errores
- Compatible con CORS para comunicación con el frontend

## Estructura del Proyecto

```
backend/
├── app.py                 # Punto de entrada y rutas API
├── requirements.txt       # Dependencias Python
├── Procfile               # Configuración para Heroku
├── runtime.txt            # Versión de Python para Heroku
├── utils/                 # Utilidades
│   ├── calculators.py     # Funciones de cálculo antropométrico
│   └── validators.py      # Validadores de datos
└── models/                # Modelos de datos (si aplica)
```

## Instalación y Ejecución

1. Crear un entorno virtual:
```bash
python -m venv venv
```

2. Activar el entorno virtual:
```bash
# En macOS/Linux
source venv/bin/activate

# En Windows
venv\Scripts\activate
```

3. Instalar dependencias:
```bash
pip install -r requirements.txt
```

4. Ejecutar el servidor de desarrollo:
```bash
python app.py
```

El servidor estará disponible en `http://localhost:5000`.

## Endpoints API

- `GET /api/health` - Verificar el estado del servidor
- `POST /api/calculate` - Calcular métricas antropométricas
- `POST /api/recommendations` - Obtener recomendaciones personalizadas

### Ejemplo de Solicitud para /api/calculate

```json
{
  "gender": "M",
  "age": 30,
  "weight": 75,
  "height": 180,
  "waist": 85,
  "hip": 95,
  "triceps_fold": 12,
  "subscapular_fold": 15,
  "suprailiac_fold": 18
}
```

## Despliegue en Heroku

1. Asegúrate de tener instalado Heroku CLI y haber iniciado sesión:
```bash
heroku login
```

2. Crear una aplicación en Heroku:
```bash
cd /ruta/al/backend
heroku create anthrocalc-pro-api
```

3. Desplegar a Heroku:
```bash
git init
git add .
git commit -m "Initial backend commit"
heroku git:remote -a anthrocalc-pro-api
git push heroku master
```

4. Verifica el despliegue:
```bash
heroku open
```

Y navega a la ruta `/api/health` para confirmar que la API está funcionando.

## Configuración CORS

Para permitir solicitudes desde diferentes orígenes (como GitHub Pages), se ha configurado CORS en `app.py`. Si necesitas restringir los orígenes permitidos, modifica la configuración CORS en ese archivo.
