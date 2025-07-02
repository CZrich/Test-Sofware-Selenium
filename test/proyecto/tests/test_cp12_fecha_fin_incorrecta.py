import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
from screenshot import save_screenshot

def test_cp12_fecha_fin_incorrecta(driver):
    driver.get("http://localhost:5173/proyectos")
    wait = WebDriverWait(driver, 10)

    nombre_input = wait.until(EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Nombre del proyecto']")))
    nombre_input.clear()
    nombre_input.send_keys("Proyecto C")

    depto_select = wait.until(EC.presence_of_element_located((By.XPATH, "//select[contains(@class, 'rounded-md') and @required]")))
    Select(depto_select).select_by_index(1)

    date_inputs = driver.find_elements(By.XPATH, "//input[@type='date']")
    assert len(date_inputs) == 2, "No se encontraron ambos campos de fecha"
    ini_input = date_inputs[0]
    fin_input = date_inputs[1]
    ini_input.clear()
    ini_input.send_keys("20/06/2025")
    fin_input.clear()
    fin_input.send_keys("15/06/2025")

    try:
        ingeniero_select = driver.find_element(By.XPATH, "//select[contains(@class, 'border') and contains(@class, 'rounded-md') and not(@required)]")
        ingeniero_options = ingeniero_select.find_elements(By.TAG_NAME, "option")
        # Excluir la opción por defecto (value="")
        opciones_validas = [opt for opt in ingeniero_options if opt.get_attribute("value") and opt.get_attribute("value") != ""]
        if opciones_validas:
            # Selecciona el primer ingeniero disponible
            ingeniero_select.click()
            opciones_validas[0].click()
            # Click en el botón "Añadir"
            add_btn = driver.find_element(By.XPATH, "//button[contains(text(),'Añadir')]")
            add_btn.click()
    except Exception:
        # Si no existe el select o no hay ingenieros, continúa sin error
        pass

    submit_btn = driver.find_element(By.XPATH, "//button[@type='submit' and contains(text(),'Crear')]")
    submit_btn.click()

    # Verifica mensaje de error
    error = wait.until(EC.visibility_of_element_located((By.XPATH, "//*[contains(text(),'La fecha de inicio no puede ser posterior a la fecha de fin')]")))
    assert "fecha" in error.text.lower()
    save_screenshot(driver, "cp12_fecha_fin_incorrecta")