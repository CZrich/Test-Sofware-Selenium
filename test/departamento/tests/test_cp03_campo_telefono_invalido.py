# test_cp03_campo_telefono_invalido.py

import os
import uuid
import pytest
from datetime import datetime
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_URL = "http://localhost:5173/departamentos"


@pytest.mark.negative
def test_cp03_campo_telefono_invalido(driver):
    """Prueba negativa: verificar que no se acepta un número de teléfono inválido (menos o más de 9 dígitos)."""
    driver.get(BASE_URL)

    wait = WebDriverWait(driver, 10)

    # --- 1) Localizar campos ---
    nombre_input = wait.until(
        EC.visibility_of_element_located((By.XPATH, "//input[@placeholder='Nombre']"))
    )
    telefono_input = driver.find_element(By.XPATH, "//input[@placeholder='Teléfono']")
    fax_input = driver.find_element(By.XPATH, "//input[@placeholder='Fax']")

    # --- 2) Ingresar valores ---
    nombre_departamento = "Dept QA"
    nombre_input.clear()
    nombre_input.send_keys(nombre_departamento)

    telefono_invalido = "1234abc"  # inválido: menos de 9 dígitos y contiene letras
    telefono_input.clear()
    telefono_input.send_keys(telefono_invalido)

    fax_input.clear()
    fax_input.send_keys("987654321")

    # --- 3) Enviar el formulario ---
    driver.find_element(By.XPATH, "//button[@type='submit']").click()

    # --- 4) Verificar que NO se creó el departamento ---
    try:
        WebDriverWait(driver, 3).until(
            EC.visibility_of_element_located(
                (By.XPATH, f"//li[contains(., '{nombre_departamento}')]")
            )
        )
        creado = True
    except:
        creado = False

    assert not creado, f"❌ El departamento con teléfono inválido '{telefono_invalido}' fue creado (debería fallar la validación)."

    # --- 5) Captura de pantalla ---
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"resultados/cp03_{timestamp}.png"
    os.makedirs("resultados", exist_ok=True)
    driver.save_screenshot(filename)
    print(f"\n🖼️ Captura guardada: {filename}")
