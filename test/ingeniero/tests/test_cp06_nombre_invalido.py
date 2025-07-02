import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from screenshot import save_screenshot

def test_cp06_nombre_invalido(driver):
    driver.get("http://localhost:5173/ingenieros")

    # Rellenar campos
    driver.find_element(By.ID, "ing-nombre").send_keys("Al")  # inválido (< 3 letras)
    driver.find_element(By.ID, "ing-cargo").send_keys("Software")
    driver.find_element(By.ID, "ing-especialidad").send_keys("Telemática")
    driver.find_element(By.ID, "ing-submit").click()

    # Verificar mensaje de error en el campo nombre
    error = WebDriverWait(driver, 5).until(
        EC.visibility_of_element_located(
            (By.XPATH, "//span[contains(@class, 'text-yellow-700') and contains(text(), 'nombre')]")
        )
    )
    assert error is not None

    # Verificar que NO se creó tarjeta con nombre "Al"
    cards = driver.find_elements(By.XPATH, "//li[contains(., 'Al')]")
    assert len(cards) == 0
    save_screenshot(driver, "cp06_nombre_invalido")
