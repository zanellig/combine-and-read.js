# UXPos BackOffice OCR

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gzanelli/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:gonzalozanelli1@gmail.com)

## Languages - Idiomas

- [ES-AR](#español)
- [EN-US](#english)

## Español

### Introducción

Bienvenido al proyecto UXPos BackOffice OCR. Este proyecto ha sido desarrollado para facilitar la extracción y conversión de datos de imágenes a formato XLSX. Queremos agradecer especialmente a **[Santiago Candia](https://www.linkedin.com/in/santiago-candia-76708626b/)** y **[Federico Wahlers](https://www.linkedin.com/in/federico-wahlers-989627206/)** de [LinkSolution](https://www.linkedin.com/company/linksolution-srl/) por su invaluable apoyo y colaboración en este proyecto.

### Tabla de Contenidos

- [Introducción](#introducción)
- [Tabla de Contenidos](#tabla-de-contenidos)
- [Pre-requisitos](#pre-requisitos)
- [Uso](#uso)
  - [Antes de Ejecutar](#antes-de-ejecutar)
  - [Ejecutar los modulos Independientemente](#ejecutar-los-modulos-independientemente)
  - [Actualización de dependencias manualmente](#actualización-de-dependencias-manual)
- [Notas](#notas)
- [Estructura del Proyecto](#estructura-del-proyecto)

### Pre-requisitos

1. **Node.js**: Asegurate de tener Node.js instalado. Podés descargarlo desde [Node.js](https://nodejs.org/).

2. **Python**: Asegurate de tener Python instalado. Podés descargarlo desde [Python.org](https://www.python.org/).

3. Todas las imágenes deben estar ubicadas en cada carpeta `public/images/${tienda}`.

### Uso

#### Antes de ejecutar

> [!IMPORTANT]
> Si estás utilizando un entorno bash como **msys2** o **UCRT64**, es preferible ejecutar este comando en PowerShell e instalar las dependencias de Python globalmente, ya que a veces podés encontrar errores inesperados.

**Ejecutar el script**:

```sh
npm start
```

Todos los archivos estarán ubicados en `./public/output`.

#### Ejecutar los modulos independientemente

- **Ejecutar el OCR**:

```sh
npm run ocr
```

- **Ejecutar el conversor a CSV**:

```sh
npm run csv
```

- **Ejecutar el conversor a XLSX**:

```sh
npm run xslx
```

#### Actualización de dependencias manual (opcional)

```sh
npm run install-deps
```

> [!IMPORTANT]
> Solamente vas a poder ejecutar los conversores si en algún momento corriste el OCR.

### Notas

- Si necesitás instalar Tesseract en tu sistema, seguí las instrucciones adecuadas para tu sistema operativo:

  - **Windows**: Descargá e instalá Tesseract desde [UB Mannheim](https://github.com/UB-Mannheim/tesseract/wiki)
  - **MacOS**: Usá Homebrew:

```sh
brew install tesseract
```

### Estructura del proyecto

- **public/**: Contiene las imágenes; y los archivos de salida.
- **src/**: Contiene los scripts de Node.js y Python.
- **requirements.txt**: Lista de dependencias de Python.
- **package.json**: Lista de dependencias de Node.js.

## English

### Introduction

Welcome to the UXPos BackOffice OCR project. This project has been developed to facilitate the extraction and conversion of data from images to XLSX format. We would like to extend our special thanks to **[Santiago Candia](https://www.linkedin.com/in/santiago-candia-76708626b/)** and **[Federico Wahlers](https://www.linkedin.com/in/federico-wahlers-989627206/)** from [LinkSolution](https://www.linkedin.com/company/linksolution-srl/) for their invaluable support and collaboration on this project.

### Table of Contents

- [Introduction](#introduction)
- [Table of Contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
  - [Before You Run](#before-you-run)
  - [Running Each Module Independently](#running-each-module-independently)
  - [Updating Dependencies Manually](#updating-dependencies-manually)
- [Notes](#notes)
- [Project Structure](#project-structure)

### Prerequisites

1. **Node.js**: Ensure you have Node.js installed. You can download it from [Node.js](https://nodejs.org/).

2. **Python**: Ensure you have Python installed. You can download it from [Python.org](https://www.python.org/).

3. All the images should be located in each `public/images/${tienda}` folder.

### Usage

#### Before you run

> [!IMPORTANT]
> If you're using a bash environment like **msys2** or **UCRT64**, prefer running this command on PowerShell and install the required Python dependencies globally, as sometimes you'll encounter unexpected errors.

1. **Run the script**:

```sh
npm start
```

All the files will be located in `./public/output`.

#### Running each module independently

- **Running the OCR module**:

```sh
npm run ocr
```

- **Running the CSV module**:

```sh
npm run csv
```

- **Running the XLSX module**:

```sh
npm run xslx
```

#### Updating dependencies manually (optional)

```sh
  npm run install-deps
```

> [!IMPORTANT]
> You can only run the converters if you've run the OCR at least once.

### Notes

- If you need to install Tesseract on your system, follow the appropriate instructions for your operating system:

  - **Windows**: Download and install Tesseract from [UB Mannheim](https://github.com/UB-Mannheim/tesseract/wiki)
  - **MacOS**: Use Homebrew:

    ```sh
    brew install tesseract
    ```

### Project structure

- **public/**: Contains the images and output files.
- **src/**: Contains the Node.js and Python scripts.
- **requirements.txt**: List of Python dependencies.
- **package.json**: List of Node.js dependencies.
