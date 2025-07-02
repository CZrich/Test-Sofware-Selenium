# test_cp02_campo_nombre_invalido.py

import os
import uuid
import pytest
from datetime import datetime
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_URL = "http://localhost:5173/departamentos"


@pytest.mark.negative
def test_cp02_campo_nombre_invalido(driver):
    """Prueba negativa: intentar crear un departamento con un nombre inválido (con números o símbolos)."""
    driver.get(BASE_URL)

    wait = WebDriverWait(driver, 10)

    # --- 1) Localizar los campos del formulario ---
    nombre_input = wait.until(
        EC.visibility_of_element_located((By.XPATH, "//input[@placeholder='Nombre']"))
    )
    telefono_input = driver.find_element(By.XPATH, "//input[@placeholder='Teléfono']")
    fax_input = driver.find_element(By.XPATH, "//input[@placeholder='Fax']")

    # --- 2) Ingresar datos con nombre inválido ---
    nombre_invalido = f"Dept@{uuid.uuid4().hex[:4]}"  # ejemplo: Dept@12ab
    nombre_input.clear()
    nombre_input.send_keys(nombre_invalido)

    telefono_input.clear()
    telefono_input.send_keys("123456789")

    fax_input.clear()
    fax_input.send_keys("987654321")

    # --- 3) Enviar el formulario ---
    driver.find_element(By.XPATH, "//button[@type='submit']").click()

    # --- 4) Verificar que NO se agregó el departamento ---
    # Espera breve para detectar si aparece en la lista
    try:
        WebDriverWait(driver, 3).until(
            EC.visibility_of_element_located(
                (By.XPATH, f"//li[contains(., '{nombre_invalido}')]")
            )
        )
        creado = True
    except:
        creado = False

    assert not creado, f"❌ El departamento con nombre inválido '{nombre_invalido}' fue creado (error de validación)."

    # --- 5) Captura de pantalla ---
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"resultados/cp02_{timestamp}.png"
    os.makedirs("resultados", exist_ok=True)
    driver.save_screenshot(filename)
    print(f"\n🖼️ Captura guardada: {filename}")
