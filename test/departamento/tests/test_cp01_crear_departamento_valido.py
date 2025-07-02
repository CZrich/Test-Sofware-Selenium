# test_cp01_crear_departamento_valido.py

import uuid
import os
import pytest
from datetime import datetime
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_URL = "http://localhost:5173/departamentos"


@pytest.mark.smoke
def test_cp01_crear_departamento_valido(driver):
    """Crea un departamento con datos correctos y comprueba que se muestre en la lista."""
    driver.get(BASE_URL)

    wait = WebDriverWait(driver, 10)

    # --- 1) Localizar los campos del formulario ---
    nombre_input = wait.until(
        EC.visibility_of_element_located((By.XPATH, "//input[@placeholder='Nombre']"))
    )
    telefono_input = driver.find_element(By.XPATH, "//input[@placeholder='Teléfono']")
    fax_input = driver.find_element(By.XPATH, "//input[@placeholder='Fax']")

    # --- 2) Rellenar el formulario ---
    nombre_departamento = "Departamento de QA"
    nombre_input.clear()
    nombre_input.send_keys(nombre_departamento)

    telefono_input.clear()
    telefono_input.send_keys("123456789")

    fax_input.clear()
    fax_input.send_keys("987654321")

    # --- 3) Enviar el formulario ---
    driver.find_element(By.XPATH, "//button[@type='submit']").click()

    # --- 4) Verificar la creación ---
    nuevo_item = wait.until(
        EC.visibility_of_element_located(
            (By.XPATH, f"//li[contains(., '{nombre_departamento}')]")
        )
    )
    assert nuevo_item, "El nuevo departamento no se encontró en la lista"

    # --- 5) Captura de pantalla ---
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"resultados/cp01_{timestamp}.png"
    os.makedirs("resultados", exist_ok=True)
    driver.save_screenshot(filename)
    print(f"\n🖼️ Captura guardada: {filename}")

