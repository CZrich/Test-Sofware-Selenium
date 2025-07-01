import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def test_cp07_cargo_invalido(driver):
    driver.get("http://localhost:5173/ingenieros")

    driver.find_element(By.ID, "ing-nombre").send_keys("María López")
    driver.find_element(By.ID, "ing-cargo").send_keys("Te3")  # inválido (contiene número)
    driver.find_element(By.ID, "ing-especialidad").send_keys("Telemática")
    driver.find_element(By.ID, "ing-submit").click()

    # Verificar mensaje de error en el campo cargo
    error = WebDriverWait(driver, 5).until(
        EC.visibility_of_element_located(
            (By.XPATH, "//span[contains(@class, 'text-yellow-700') and contains(text(), 'cargo')]")
        )
    )
    assert error is not None

    # No debe crearse la tarjeta con ese cargo
    cards = driver.find_elements(By.XPATH, "//li[contains(., 'Te3')]")
    assert len(cards) == 0
