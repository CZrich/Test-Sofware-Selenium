# Proyecto Empresa

Este proyecto contiene un backend en Java (Spring Boot) y un frontend en JavaScript (Vite + React).

## Requisitos

- MySQL corriendo en el puerto 3306
- Node.js y npm instalados
- JDK 17 o superior instalado
- Python 3.8+ instalado

## Base de Datos

Crear una base de datos llamada `empresa` en MySQL

## Backend

Ubicación: `demo`

1. Ir al directorio del backend:

```bash
cd demo
```

2. Para ejecutar el backend:

```bash
./mvnw spring-boot:run
```

O desde un IDE como IntelliJ o Eclipse, ejecutar `EmpresaApplication` como aplicación Spring Boot.

## Frontend

Ubicación: `client`

1. Ir al directorio del cliente:

```bash
cd client
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173`.


## Pruebas automatizadas

Para ejecutar las pruebas automatizadas, sigue los siguientes pasos desde la raíz del repositorio:

1. Crear y activar un entorno virtual (opcional pero recomendado):

```bash
python -m venv venv
venv\Scripts\activate  # En Windows
# source venv/bin/activate  # En Linux o macOS
````

2. Instalar las dependencias del proyecto:

```bash
pip install -r requirements.txt
```

3. Ejecutar las pruebas con `pytest`, dirigiéndose al módulo `test/`:

```bash
pytest -v .\proyecto\tests\
```

```bash
pytest -v .\ingeniero\tests\
```

```bash
pytest -v .\departamento\tests\
```

> Las pruebas generan capturas de pantalla automáticamente, las cuales se guardarán en el directorio `resultados/`.

```

¿Deseas también agregar una ruta específica donde se guardan las capturas (por ejemplo, `resultados/`) o dejarlo genérico como está?
