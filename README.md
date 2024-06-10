# UXPos BackOffice OCR

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gzanelli/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:gonzalozanelli1@gmail.com)

## Languages - Idiomas

- [ES-AR](#español)
- [EN-US](#english)

# Español

## Introducción

Bienvenido al proyecto UXPos BackOffice OCR. Este proyecto ha sido desarrollado para facilitar la extracción y conversión de datos de imágenes a formato CSV. Queremos agradecer especialmente a Santiago Candia y Federico Wahler de LinkSolution por su invaluable apoyo y colaboración en este proyecto.

## Tabla de Contenidos

- [Introducción](#introducción)
- [Tabla de Contenidos](#tabla-de-contenidos)
- [Pre-requisitos](#pre-requisitos)
- [Instalación](#instalación)
- [Uso](#uso)
  - [Antes de Ejecutar](#antes-de-ejecutar)
  - [Ejecutar el OCR](#ejecutar-el-ocr)
  - [Ejecutar el Convertidor CSV](#ejecutar-el-convertidor-csv)
- [Notas](#notas)
- [Estructura del Proyecto](#estructura-del-proyecto)

## Pre-requisitos

1. **Node.js**: Asegurate de tener Node.js instalado. Podés descargarlo desde [Node.js](https://nodejs.org/).

2. **Python**: Asegurate de tener Python instalado. Podés descargarlo desde [Python.org](https://www.python.org/).

3. Todas las imágenes deben estar ubicadas en cada carpeta `public/images/${tienda}`.

## Instalación

1. **Instalar dependencias de Node.js**:

   ```sh
   npm install
   ```

2. **Instalar dependencias de Python**:

   ```sh
   pip install -r requirements.txt
   ```

3. Configuración del entorno virtual de Python (opcional pero recomendado):

   ```sh
   python -m venv venv
   source venv/bin/activate # En Windows usar `venv\Scripts\activate`
   pip install -r requirements.txt
   ```

## Uso

### Antes de ejecutar

> [!IMPORTANTE]
> Si estás utilizando un entorno bash como **msys2** o **UCRT64**, es preferible ejecutar este comando en PowerShell e instalar las dependencias de Python globalmente, ya que a veces podés encontrar errores inesperados.

1. **Instalar las dependencias**:

   ```sh
   npm install && pip install -r requirements.txt
   ```

2. **Ejecutar el OCR**:
   ```sh
   npm start
   ```
3. **Ejecutar el conversor a CSV**:
   ```sh
   npm run csv
   ```

Todos los archivos estarán ubicados en `./public/output`.

## Notas

- Si necesitás instalar Tesseract en tu sistema, seguí las instrucciones adecuadas para tu sistema operativo:
  - **Windows**: DDescargá e instalá Tesseract desde [UB Mannheim](https://github.com/UB-Mannheim/tesseract/wiki)
  - **MacOS**: Usá Homebrew:
    ```sh
    brew install tesseract
    ```

## Estructura del proyecto

- **public/**: Contiene las imágenes; y los archivos de salida.
- **src/**: Contiene los scripts de Node.js y Python.
- **requirements.txt**: Lista de dependencias de Python.
- **package.json**: Lista de dependencias de Node.js.

# English

## Introduction

Welcome to the UXPos BackOffice OCR project. This project has been developed to facilitate the extraction and conversion of data from images to CSV format. We would like to extend our special thanks to Santiago Candia and Federico Wahler from LinkSolution for their invaluable support and collaboration on this project.

## Table of Contents

- [Introduction](#introduction)
- [Table of Contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [Before You Run](#before-you-run)
  - [Running the OCR](#running-the-ocr)
  - [Running the CSV Converter](#running-the-csv-converter)
- [Notes](#notes)
- [Project Structure](#project-structure)

## Prerequisites

1. **Node.js**: Ensure you have Node.js installed. You can download it from [Node.js](https://nodejs.org/).

2. **Python**: Ensure you have Python installed. You can download it from [Python.org](https://www.python.org/).

3. All the images should be located in each `public/images/${tienda}` folder.

## Installation

1. **Install Node.js dependencies**:

   ```sh
   npm install
   ```

2. **Install Python dependencies**:

   ```sh
   pip install -r requirements.txt
   ```

3. Setting up the Python virtual environment (optional but recommended):

   ```sh
   python -m venv venv
   source venv/bin/activate # On Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   ```

## Usage

### Before you run

> [!IMPORTANT]
> If you're using a bash environment like **msys2** or **UCRT64**, prefer running this command on PowerShell and install the required Python dependencies globally, as sometimes you'll encounter unexpected errors.

1. **Install the dependencies**:

   ```sh
   npm install && pip install -r requirements.txt
   ```

2. **Run the OCR**:
   ```sh
   npm start
   ```
3. **Run the CSV converter**:
   ```sh
   npm run csv
   ```

All the files will be located in `./public/output`.

## Notes

- If you need to install Tesseract on your system, follow the appropriate instructions for your operating system:
  - **Windows**: Download and install Tesseract from [UB Mannheim](https://github.com/UB-Mannheim/tesseract/wiki)
  - **MacOS**: Use Homebrew:
    ```sh
    brew install tesseract
    ```

## Project structure

- **public/**: Contains the images and output files.
- **src/**: Contains the Node.js and Python scripts.
- **requirements.txt**: List of Python dependencies.
- **package.json**: List of Node.js dependencies.
