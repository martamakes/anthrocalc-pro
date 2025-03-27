"""
Servidor principal para la aplicación de antropometría deportiva.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from utils.calculators import process_anthropometric_data

app = Flask(__name__)
# Permitir solicitudes desde GitHub Pages
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/health', methods=['GET'])
def health_check():
    """Endpoint para verificar que el servidor está funcionando."""
    return jsonify({"status": "ok"})

@app.route('/api/calculate', methods=['POST'])
def calculate_anthropometry():
    """
    Endpoint principal para procesar datos antropométricos.
    
    Espera un JSON con todos los datos de medición antropométrica
    y devuelve los resultados calculados.
    """
    data = request.json
    
    if not data:
        return jsonify({"success": False, "error": "No se proporcionaron datos"}), 400
    
    # Validar datos requeridos
    required_fields = ['gender', 'age', 'weight', 'height', 'waist', 'hip']
    for field in required_fields:
        if field not in data:
            return jsonify({
                "success": False, 
                "error": f"Campo requerido faltante: {field}"
            }), 400
    
    # Procesar datos antropométricos
    results = process_anthropometric_data(data)
    
    if not results.get('success'):
        return jsonify(results), 400
    
    return jsonify(results)

@app.route('/api/recommendations', methods=['POST'])
def get_recommendations():
    """
    Proporciona recomendaciones detalladas basadas en los resultados antropométricos.
    """
    data = request.json
    
    if not data or 'goal' not in data:
        return jsonify({"success": False, "error": "Datos insuficientes"}), 400
    
    # Aquí se podrían implementar recomendaciones más avanzadas
    # basadas en los perfiles deportivos, detalles de entrenamiento, etc.
    
    primary_goal = data['goal'].get('primary_goal')
    
    recommendations = {
        "Reducción visceral": {
            "nutrition": [
                "Déficit calórico moderado (15-20%)",
                "Enfoque en alimentos con bajo índice glucémico",
                "Priorizar proteínas (2g/kg) y grasas saludables",
                "Considerar ayuno intermitente 16/8"
            ],
            "training": [
                "3-4 sesiones semanales HIIT",
                "2-3 sesiones semanales de fuerza",
                "Monitorizar perímetro abdominal semanalmente"
            ],
            "supplements": [
                "Omega-3 (2-4g/día)",
                "Té verde o EGCG",
                "Considerar L-carnitina pre-entrenamiento"
            ]
        },
        "Hipertrofia": {
            "nutrition": [
                "Superávit calórico moderado (250-500 kcal)",
                "Proteínas: 2.2-2.5g/kg de peso",
                "Distribución de proteínas: 4-5 comidas",
                "Carbohidratos peri-entrenamiento"
            ],
            "training": [
                "Entrenamiento de fuerza 4-5 días/semana",
                "Enfoque en hipertrofia (8-12 repeticiones)",
                "Programación con sobrecarga progresiva",
                "Descanso óptimo entre series (60-90s)"
            ],
            "supplements": [
                "Creatina monohidrato (5g/día)",
                "Proteína de suero post-entrenamiento",
                "Considerar beta-alanina para entrenamientos intensos"
            ]
        },
        "Recomposición avanzada": {
            "nutrition": [
                "Mantenimiento calórico con ciclado nutricional",
                "Superávit en días de entrenamiento (+10%)",
                "Déficit en días de descanso (-10%)",
                "Proteínas elevadas constantes (2.2g/kg)"
            ],
            "training": [
                "Entrenamiento mixto: fuerza-metabólico",
                "Periodización ondulante",
                "Incluir entrenamiento concurrente estratégico",
                "Monitorizar rendimiento y recuperación"
            ],
            "supplements": [
                "Creatina (5g/día)",
                "Cafeína pre-entrenamiento",
                "Proteína de digestión rápida y lenta"
            ]
        },
        "Plan estándar": {
            "nutrition": [
                "Balance calórico ajustado a objetivo específico",
                "Distribución macronutrientes balanceada",
                "Enfoque en calidad nutricional",
                "Hidratación óptima (35ml/kg)"
            ],
            "training": [
                "Programa combinado fuerza-resistencia",
                "3-4 sesiones semanales",
                "Progresión gradual de intensidad",
                "Incluir componente de movilidad y flexibilidad"
            ],
            "supplements": [
                "Multivitamínico básico",
                "Proteína de suero si es necesario",
                "Considerar creatina según objetivos específicos"
            ]
        }
    }
    
    return jsonify({
        "success": True,
        "recommendations": recommendations.get(primary_goal, {"message": "No hay recomendaciones específicas para este objetivo"})
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)