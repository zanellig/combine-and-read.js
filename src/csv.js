const fs = require('fs');
const path = require('path');
const { TIENDAS } = require('./tiendas.js');

class Persona {
  constructor(tienda, id, name) {
    this.tienda = tienda;
    this.id = id.trim();
    this.name = name.trim();
  }

  toCsvString() {
    return `${this.tienda},${this.id},${this.name}`;
  }
}

class CsvManager {
  constructor() {
    if (CsvManager.instance) {
      return CsvManager.instance;
    }
    CsvManager.instance = this;
    this.outputFilePath = this.getOutputFilePath(
      'UXPos BackOffice Personas.csv'
    );
  }

  getOutputFilePath(baseName) {
    let counter = 0;
    let filePath = path.join(
      __dirname,
      '..',
      'public',
      'output',
      `${baseName}`
    );
    while (fs.existsSync(filePath)) {
      counter++;
      filePath = path.join(
        __dirname,
        '..',
        'public',
        'output',
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
        __dirname,
        '..',
        'public',
        'output',
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
    const lines = data.split('\n').filter(line => line.trim() !== '');

    for (const line of lines) {
      const id = (
        line[3] === ' ' ? line.substring(0, 3) : line.substring(0, 4)
      ).trim();
      const name = line.substring(id.length).trim();
      const persona = new Persona(tienda, id, name);
      this.appendToFile(persona.toCsvString());
    }
  }

  appendToFile(data) {
    fs.appendFileSync(this.outputFilePath, data + '\n', 'utf8');
  }
}

(async () => {
  const csvManager = new CsvManager();
  await csvManager.processTiendas();
  console.log(`Archivo CSV generado en: ${csvManager.outputFilePath}`);
})();
