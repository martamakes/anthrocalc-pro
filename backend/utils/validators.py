"""
Funciones para validar datos de entrada en la aplicación de antropometría.
"""

import re
import numpy as np

def is_valid_number(value, min_value=None, max_value=None):
    """
    Verifica si un valor es un número válido dentro de un rango.
    
    Args:
        value: Valor a validar
        min_value: Valor mínimo permitido (opcional)
        max_value: Valor máximo permitido (opcional)
        
    Returns:
        bool: True si es válido, False en caso contrario
    """
    try:
        num_value = float(value)
        
        if min_value is not None and num_value < min_value:
            return False
        
        if max_value is not None and num_value > max_value:
            return False
        
        return True
    except (ValueError, TypeError):
        return False

def is_valid_gender(gender):
    """
    Verifica si el género es válido.
    
    Args:
        gender: Género a validar ('M' o 'F')
        
    Returns:
        bool: True si es válido, False en caso contrario
    """
    return gender in ['M', 'F']

def is_valid_age(age):
    """
    Verifica si la edad es válida.
    
    Args:
        age: Edad a validar
        
    Returns:
        bool: True si es válida, False en caso contrario
    """
    return is_valid_number(age, 10, 120)

def is_valid_weight(weight):
    """
    Verifica si el peso es válido.
    
    Args:
        weight: Peso en kg a validar
        
    Returns:
        bool: True si es válido, False en caso contrario
    """
    return is_valid_number(weight, 30, 300)

def is_valid_height(height):
    """
    Verifica si la estatura es válida.
    
    Args:
        height: Estatura en cm a validar
        
    Returns:
        bool: True si es válida, False en caso contrario
    """
    return is_valid_number(height, 100, 250)

def is_valid_circumference(circumference):
    """
    Verifica si una circunferencia es válida.
    
    Args:
        circumference: Circunferencia en cm a validar
        
    Returns:
        bool: True si es válida, False en caso contrario
    """
    return is_valid_number(circumference, 20, 200)

def is_valid_skinfold(skinfold):
    """
    Verifica si un pliegue cutáneo es válido.
    
    Args:
        skinfold: Pliegue cutáneo en mm a validar
        
    Returns:
        bool: True si es válido, False en caso contrario
    """
    return is_valid_number(skinfold, 3, 70)

def validate_anthropometric_input(data):
    """
    Valida todos los datos antropométricos de entrada.
    
    Args:
        data (dict): Diccionario con datos antropométricos
        
    Returns:
        tuple: (bool, dict) - (es_valido, errores)
    """
    errors = {}
    
    # Validar datos básicos requeridos
    if 'gender' not in data or not is_valid_gender(data['gender']):
        errors['gender'] = "El género debe ser 'M' o 'F'"
    
    if 'age' not in data or not is_valid_age(data['age']):
        errors['age'] = "La edad debe estar entre 10 y 120 años"
    
    if 'weight' not in data or not is_valid_weight(data['weight']):
        errors['weight'] = "El peso debe estar entre 30 y 300 kg"
    
    if 'height' not in data or not is_valid_height(data['height']):
        errors['height'] = "La estatura debe estar entre 100 y 250 cm"
    
    if 'waist' not in data or not is_valid_circumference(data['waist']):
        errors['waist'] = "La circunferencia de cintura debe estar entre 20 y 200 cm"
    
    if 'hip' not in data or not is_valid_circumference(data['hip']):
        errors['hip'] = "La circunferencia de cadera debe estar entre 20 y 200 cm"
    
    # Validar pliegues cutáneos (opcionales)
    for fold_name in ['triceps_fold', 'subscapular_fold', 'suprailiac_fold']:
        if fold_name in data and not is_valid_skinfold(data[fold_name]):
            errors[fold_name] = f"El pliegue debe estar entre 3 y 70 mm"
    
    # Validaciones cruzadas
    if 'waist' in data and 'hip' in data:
        if data['waist'] > data['hip']:
            errors['waist_hip'] = "La circunferencia de cadera debe ser mayor que la de cintura"
    
    # Validar coherencia del IMC con peso y estatura
    if 'weight' in data and 'height' in data:
        weight = float(data['weight'])
        height = float(data['height']) / 100  # Convertir a metros
        imc = weight / (height ** 2)
        
        if imc < 12 or imc > 60:
            errors['bmi_coherence'] = "La relación peso-estatura no es fisiológicamente coherente"
    
    return len(errors) == 0, errors

def validate_cv_measurements(measurements):
    """
    Valida el coeficiente de variación de mediciones repetidas (protocolo ISAK).
    
    Args:
        measurements (list): Lista de mediciones repetidas
        
    Returns:
        tuple: (bool, float) - (es_valido, cv)
    """
    if len(measurements) < 2:
        return False, 0
    
    cv = np.std(measurements, ddof=1) / np.mean(measurements) * 100
    
    # Según ISAK, CV > 5% indica error técnico de medida inaceptable
    return cv <= 5.0, round(cv, 2)