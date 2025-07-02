import os

def save_screenshot(driver, nombre):
    carpeta = "resultados"
    if not os.path.exists(carpeta):
        os.makedirs(carpeta)
    ruta = os.path.join(carpeta, f"{nombre}.png")
    driver.save_screenshot(ruta)