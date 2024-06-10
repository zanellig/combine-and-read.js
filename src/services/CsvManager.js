const fs = require('fs');
const path = require('path');
const Persona = require('../models/Persona');
const { TIENDAS } = require('../tiendas.js');

class CsvManager {
  constructor(outputDir) {
    if (CsvManager.instance) {
      return CsvManager.instance;
    }
    this.outputDir =
      outputDir || path.join(__dirname, '..', '..', 'public', 'output');
    this.outputFilePath = this.getOutputFilePath(
      'UXPos BackOffice Personas.csv'
    );
    CsvManager.instance = this;
  }

  getOutputFilePath(baseName) {
    let counter = 0;
    let filePath = path.join(this.outputDir, `${baseName}`);
    while (fs.existsSync(filePath)) {
      counter++;
      filePath = path.join(
        this.outputDir,
        `${baseName.replace('.csv', `(${counter}).csv`)}`
      );
    }
    return filePath;
  }

  async processTiendas() {
    const header = 'Tienda,ID,Nombre\n';
    fs.writeFileSync(this.outputFilePath, header, 'utf8');

    for (const tienda of TIENDAS) {
      const inputFilePath = path.join(
        this.outputDir,
        tienda,
        `${tienda}-output.txt`
      );
      if (fs.existsSync(inputFilePath)) {
        await this.processFile(inputFilePath, tienda);
      } else {
        console.warn(`El archivo ${inputFilePath} no existe`);
      }
    }
  }

  async processFile(filePath, tienda) {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data
      .toUpperCase()
      .split('\n')
      .filter(line => line.trim() !== '');

    for (const line of lines) {
      const [id, name] = line.split('\t');
      const persona = new Persona(tienda, id?.trim(), name?.trim());
      this.appendToFile(persona.toCsvString());
    }
  }

  appendToFile(data) {
    fs.appendFileSync(this.outputFilePath, data + '\n', 'utf8');
  }
}

module.exports = CsvManager;
