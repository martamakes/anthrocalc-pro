# AnthroCalc Pro: Aplicación web para cálculos antropométricos avanzados

Aplicación web para cálculos antropométricos avanzados basados en protocolos ISAK con visualización de datos y recomendaciones personalizadas para nutrición deportiva.

## Estructura del Proyecto

- **frontend**: Aplicación React con Material UI
- **backend**: API RESTful en Flask

## Requisitos Previos

- Node.js 14 o superior
- npm 6 o superior
- Python 3.9 o superior
- Git
- Cuenta de GitHub
- Cuenta de Heroku

## Configuración del Entorno de Desarrollo

### Clonar el Repositorio

```bash
git clone https://github.com/TU-USUARIO/anthrocalc-pro.git
cd anthrocalc-pro
```

### Frontend (React)

```bash
cd frontend
npm install
npm start
```

La aplicación estará disponible en `http://localhost:3000`

### Backend (Flask)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

El servidor API estará disponible en `http://localhost:5000`

## Despliegue

### Backend (Heroku)

1. Instalar Heroku CLI:
```bash
brew install heroku/brew/heroku  # macOS
# O sigue las instrucciones en https://devcenter.heroku.com/articles/heroku-cli
```

2. Iniciar sesión en Heroku:
```bash
heroku login
```

3. Crear la aplicación en Heroku:
```bash
cd backend
heroku create anthrocalc-pro-api
```

4. Desplegar a Heroku:
```bash
git init
git add .
git commit -m "Initial backend commit"
heroku git:remote -a anthrocalc-pro-api
git push heroku master
```

### Frontend (GitHub Pages)

1. Actualizar el archivo package.json con tu nombre de usuario de GitHub:
```json
"homepage": "https://TU-USUARIO.github.io/anthrocalc-pro",
```

2. Instalar gh-pages y desplegar:
```bash
cd frontend
npm install --save-dev gh-pages
npm run deploy
```

3. Configurar GitHub Pages en el repositorio:
   - En GitHub, ve a Settings > Pages
   - En Source, selecciona la rama gh-pages
   - Guarda los cambios

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.
