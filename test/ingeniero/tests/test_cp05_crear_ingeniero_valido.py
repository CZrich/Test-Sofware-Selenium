import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

NAME  = "María López"
CARGO = "Software"
ESPEC = "Telemática"

def test_cp05_crear_ingeniero_valido(driver):
    wait = WebDriverWait(driver, 5)
    driver.get("http://localhost:5173/ingenieros")

    # Rellenar el formulario
    driver.find_element(By.ID, "ing-nombre").send_keys(NAME)
    driver.find_element(By.ID, "ing-cargo").send_keys(CARGO)
    driver.find_element(By.ID, "ing-especialidad").send_keys(ESPEC)
    driver.find_element(By.ID, "ing-submit").click()

    # Verificar que la tarjeta aparece (nombre y especialidad visibles)
    card = wait.until(
        EC.presence_of_element_located(
            (By.XPATH, f"//li[contains(., '{NAME}') and contains(., '{ESPEC}')]")
        )
    )
    assert card is not None
