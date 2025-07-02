import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
from screenshot import save_screenshot

def test_cp10_nombre_invalido(driver):
    driver.get("http://localhost:5173/proyectos")
    wait = WebDriverWait(driver, 10)

    nombre_input = wait.until(EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Nombre del proyecto']")))
    nombre_input.clear()
    nombre_input.send_keys("Pr")

    depto_select = wait.until(EC.presence_of_element_located((By.XPATH, "//select[contains(@class, 'rounded-md') and @required]")))
    Select(depto_select).select_by_index(1)

    date_inputs = driver.find_elements(By.XPATH, "//input[@type='date']")
    assert len(date_inputs) == 2, "No se encontraron ambos campos de fecha"
    ini_input = date_inputs[0]
    fin_input = date_inputs[1]
    ini_input.clear()
    ini_input.send_keys("20/06/2025") 
    fin_input.clear()
    fin_input.send_keys("25/06/2025")

    submit_btn = driver.find_element(By.XPATH, "//button[@type='submit' and contains(text(),'Crear')]")
    submit_btn.click()

    # Verifica mensaje de error
    error = wait.until(EC.visibility_of_element_located((By.XPATH, "//span[contains(text(),'El nombre debe tener entre 3 y 50 caracteres')]")))
    assert "nombre" in error.text.lower()
    save_screenshot(driver, "cp10_nombre_invalido")