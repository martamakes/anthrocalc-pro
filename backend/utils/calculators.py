"""
Funciones de cálculo para antropometría deportiva.
Implementación basada en protocolos ISAK y ecuaciones validadas.
"""

import math
import numpy as np


def validate_measurements(data):
    """
    Valida que las mediciones estén dentro de rangos fisiológicos.
    
    Args:
        data (dict): Diccionario con mediciones antropométricas
        
    Returns:
        tuple: (bool, list) - (es_valido, lista_de_errores)
    """
    errors = []
    
    # Validar rangos fisiológicos básicos
    if data.get('weight', 0) < 30 or data.get('weight', 0) > 300:
        errors.append("El peso debe estar entre 30 y 300 kg")
    
    if data.get('height', 0) < 100 or data.get('height', 0) > 250:
        errors.append("La estatura debe estar entre 100 y 250 cm")
    
    if data.get('waist', 0) < 50 or data.get('waist', 0) > 200:
        errors.append("La circunferencia de cintura debe estar entre 50 y 200 cm")
    
    # Validar coherencia entre cintura y cadera
    if data.get('waist', 0) > data.get('hip', 0):
        errors.append("La circunferencia de cadera debe ser mayor que la de cintura")
    
    # Validar pliegues cutáneos
    for fold_name in ['triceps_fold', 'subscapular_fold', 'suprailiac_fold']:
        if fold_name in data:
            if data[fold_name] < 3 or data[fold_name] > 70:
                errors.append(f"El pliegue {fold_name} debe estar entre 3 y 70 mm")
    
    return len(errors) == 0, errors


def calculate_bmi(weight, height):
    """
    Calcula el Índice de Masa Corporal (IMC)
    
    Args:
        weight (float): Peso en kg
        height (float): Estatura en cm
        
    Returns:
        float: IMC en kg/m²
    """
    height_m = height / 100
    return round(weight / (height_m ** 2), 2)


def calculate_waist_hip_ratio(waist, hip):
    """
    Calcula el Índice Cintura-Cadera (ICC)
    
    Args:
        waist (float): Circunferencia de cintura en cm
        hip (float): Circunferencia de cadera en cm
        
    Returns:
        float: Índice Cintura-Cadera
    """
    return round(waist / hip, 2)


def calculate_waist_height_ratio(waist, height):
    """
    Calcula el Índice Cintura-Estatura (ICE)
    
    Args:
        waist (float): Circunferencia de cintura en cm
        height (float): Estatura en cm
        
    Returns:
        float: Índice Cintura-Estatura
    """
    return round(waist / height, 2)


def calculate_body_roundness_index(waist, height):
    """
    Calcula el Body Roundness Index (BRI)
    
    Args:
        waist (float): Circunferencia de cintura en cm
        height (float): Estatura en cm
        
    Returns:
        float: BRI
    """
    waist_m = waist / 100
    height_m = height / 100
    
    bri = 364.2 - 365.5 * math.sqrt(1 - ((waist_m / (2 * math.pi)) ** 2) / ((0.5 * height_m) ** 2))
    return round(bri, 2)


def calculate_body_fat_jackson_pollock(gender, age, folds):
    """
    Calcula el porcentaje de grasa corporal utilizando la ecuación de Jackson-Pollock de 3 pliegues.
    
    Args:
        gender (str): Género ('M' para masculino, 'F' para femenino)
        age (int): Edad en años
        folds (dict): Diccionario con valores de pliegues cutáneos en mm:
                     - Para hombres: 'chest', 'abdomen', 'thigh'
                     - Para mujeres: 'triceps', 'suprailiac', 'thigh'
        
    Returns:
        float: Porcentaje de grasa corporal
    """
    if gender == 'M':
        # Verificar que tenemos los pliegues correctos para hombres
        if 'chest' not in folds or 'abdomen' not in folds or 'thigh' not in folds:
            # Si no tenemos los pliegues específicos para hombres pero tenemos los 3 estándar,
            # usamos la fórmula general (menos precisa)
            sum_folds = folds.get('triceps', 0) + folds.get('subscapular', 0) + folds.get('suprailiac', 0)
            density = 1.10938 - (0.0008267 * sum_folds) + (0.0000016 * (sum_folds ** 2)) - (0.0002574 * age)
        else:
            # Ecuación específica para hombres con los 3 pliegues correctos
            sum_folds = folds['chest'] + folds['abdomen'] + folds['thigh']
            density = 1.1093800 - 0.0008267 * sum_folds + 0.0000016 * (sum_folds ** 2) - 0.0002574 * age
    else:  # gender == 'F'
        # Verificar que tenemos los pliegues correctos para mujeres
        if 'triceps' not in folds or 'suprailiac' not in folds or 'thigh' not in folds:
            # Si no tenemos los pliegues específicos para mujeres pero tenemos los 3 estándar,
            # usamos la fórmula general (menos precisa)
            sum_folds = folds.get('triceps', 0) + folds.get('subscapular', 0) + folds.get('suprailiac', 0)
            density = 1.0994921 - (0.0009929 * sum_folds) + (0.0000023 * (sum_folds ** 2)) - (0.0001392 * age)
        else:
            # Ecuación específica para mujeres con los 3 pliegues correctos
            sum_folds = folds['triceps'] + folds['suprailiac'] + folds['thigh']
            density = 1.0994921 - 0.0009929 * sum_folds + 0.0000023 * (sum_folds ** 2) - 0.0001392 * age
    
    # Conversión de densidad a porcentaje de grasa utilizando la ecuación de Siri
    body_fat_percentage = ((495 / density) - 450)
    
    return round(body_fat_percentage, 1)


def calculate_fat_free_mass(weight, body_fat_percentage):
    """
    Calcula la masa libre de grasa.
    
    Args:
        weight (float): Peso en kg
        body_fat_percentage (float): Porcentaje de grasa corporal
        
    Returns:
        float: Masa libre de grasa en kg
    """
    return round(weight * (1 - (body_fat_percentage / 100)), 2)


def calculate_fat_free_mass_index(fat_free_mass, height):
    """
    Calcula el Índice de Masa Libre de Grasa (IMLG)
    
    Args:
        fat_free_mass (float): Masa libre de grasa en kg
        height (float): Estatura en cm
        
    Returns:
        float: IMLG en kg/m²
    """
    height_m = height / 100
    return round(fat_free_mass / (height_m ** 2), 2)


def determine_goal(gender, waist_hip_ratio, fat_free_mass_index, body_fat_percentage):
    """
    Determina el objetivo recomendado basado en los parámetros antropométricos.
    
    Args:
        gender (str): Género ('M' para masculino, 'F' para femenino)
        waist_hip_ratio (float): Índice Cintura-Cadera
        fat_free_mass_index (float): Índice de Masa Libre de Grasa
        body_fat_percentage (float): Porcentaje de grasa corporal
        
    Returns:
        dict: Objetivo recomendado con detalles
    """
    whc_threshold = 0.90 if gender == 'M' else 0.85
    ffmi_threshold = 19 if gender == 'M' else 15
    
    if waist_hip_ratio > whc_threshold:
        goal = {
            "primary_goal": "Reducción visceral",
            "description": "Priorizar reducción de grasa abdominal",
            "caloric_deficit": max(10, min(20, int((waist_hip_ratio - whc_threshold) * 100))),
            "training_focus": "Entrenamiento de alta intensidad y ejercicio aeróbico",
        }
    elif fat_free_mass_index < ffmi_threshold:
        goal = {
            "primary_goal": "Hipertrofia",
            "description": "Priorizar ganancia de masa muscular",
            "caloric_surplus": 300 + int((ffmi_threshold - fat_free_mass_index) * 50),
            "training_focus": "Entrenamiento de fuerza e hipertrofia",
        }
    elif 15 <= body_fat_percentage <= 25:
        goal = {
            "primary_goal": "Recomposición avanzada",
            "description": "Equilibrio óptimo entre ganancia muscular y pérdida grasa",
            "caloric_strategy": "Ciclado nutricional: ±5% calorías días entrenamiento/descanso",
            "training_focus": "Entrenamiento mixto fuerza-metabólico",
        }
    else:
        goal = {
            "primary_goal": "Plan estándar",
            "description": "Plan equilibrado de composición corporal",
            "caloric_strategy": "Equilibrio calórico o déficit moderado",
            "training_focus": "Entrenamiento combinado fuerza-resistencia",
        }
    
    return goal


def process_anthropometric_data(data):
    """
    Procesa los datos antropométricos completos y devuelve todos los cálculos.
    
    Args:
        data (dict): Diccionario con todos los datos antropométricos
        
    Returns:
        dict: Resultados de todos los cálculos antropométricos
    """
    results = {}
    
    # Validar datos
    is_valid, errors = validate_measurements(data)
    if not is_valid:
        return {"success": False, "errors": errors}
    
    # Datos básicos
    gender = data.get('gender')
    age = data.get('age')
    weight = data.get('weight')
    height = data.get('height')
    waist = data.get('waist')
    hip = data.get('hip')
    
    # Cálculos básicos
    results['bmi'] = calculate_bmi(weight, height)
    results['waist_hip_ratio'] = calculate_waist_hip_ratio(waist, hip)
    results['waist_height_ratio'] = calculate_waist_height_ratio(waist, height)
    results['body_roundness_index'] = calculate_body_roundness_index(waist, height)
    
    # Cálculo de composición corporal
    # Recopilamos todos los pliegues disponibles
    folds = {
        'triceps': data.get('triceps_fold', 0),
        'subscapular': data.get('subscapular_fold', 0),
        'suprailiac': data.get('suprailiac_fold', 0),
        'chest': data.get('chest_fold', 0),
        'abdomen': data.get('abdomen_fold', 0),
        'thigh': data.get('thigh_fold', 0)
    }
    
    # Solo calcular composición si se proporcionaron datos de pliegues suficientes
    basic_folds_provided = folds['triceps'] > 0 and folds['subscapular'] > 0 and folds['suprailiac'] > 0
    male_specific_folds = gender == 'M' and folds['chest'] > 0 and folds['abdomen'] > 0 and folds['thigh'] > 0
    female_specific_folds = gender == 'F' and folds['triceps'] > 0 and folds['suprailiac'] > 0 and folds['thigh'] > 0
    
    if basic_folds_provided or male_specific_folds or female_specific_folds:
        results['body_fat_percentage'] = calculate_body_fat_jackson_pollock(gender, age, folds)
        results['fat_free_mass'] = calculate_fat_free_mass(weight, results['body_fat_percentage'])
        results['fat_free_mass_index'] = calculate_fat_free_mass_index(results['fat_free_mass'], height)
        results['fat_mass'] = round(weight - results['fat_free_mass'], 2)
        
        # Determinar objetivo recomendado
        results['goal'] = determine_goal(
            gender,
            results['waist_hip_ratio'],
            results['fat_free_mass_index'],
            results['body_fat_percentage']
        )
    
    results['success'] = True
    return results