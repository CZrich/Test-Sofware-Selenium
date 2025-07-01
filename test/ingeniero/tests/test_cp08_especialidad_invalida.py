import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def test_cp08_especialidad_invalida(driver):
    driver.get("http://localhost:5173/ingenieros")

    driver.find_element(By.ID, "ing-nombre").send_keys("María López")
    driver.find_element(By.ID, "ing-cargo").send_keys("Software")
    driver.find_element(By.ID, "ing-especialidad").send_keys("Ciberseg!")  # inválido
    driver.find_element(By.ID, "ing-submit").click()

    # Verificar mensaje de error en especialidad
    error = WebDriverWait(driver, 5).until(
        EC.visibility_of_element_located(
            (By.XPATH, "//span[contains(@class, 'text-yellow-700') and contains(text(), 'especialidad')]")
        )
    )
    assert error is not None

    # No debe aparecer esa especialidad en la lista
    cards = driver.find_elements(By.XPATH, "//li[contains(., 'Ciberseg!')]")
    assert len(cards) == 0
