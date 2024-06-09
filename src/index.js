const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const Tesseract = require('tesseract.js');

const TIENDAS = [
  '5001',
  '5012',
  '5014',
  '5017',
  '5018',
  '5019',
  '5021',
  '5022',
  '5023',
  '7011',
  '7012',
  '7014',
  '7016',
  '7021',
];

class Configuration {
  constructor() {
    if (Configuration.instance) {
      return Configuration.instance;
    }
    this.basePath = path.join(__dirname, '..', 'public');
    Configuration.instance = this;
  }

  getInputFolderPath(tienda) {
    return path.join(this.basePath, 'images', tienda, 'combined');
  }

  getOutputFolderPath(tienda) {
    return path.join(this.basePath, 'output', tienda);
  }

  getOutputFilePath(tienda) {
    return path.join(this.getOutputFolderPath(tienda), `${tienda}-output.txt`);
  }
}

class DirectoryManager {
  static checkDirExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
      console.error('The directory does not exist:', dirPath);
      this.createDir(dirPath);
    }
  }

  static createDir(dirPath) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log('Directory created:', dirPath);
  }

  static checkFolderNotEmpty(dirPath) {
    const files = fs.readdirSync(dirPath);
    if (files.length < 2) {
      throw new Error(
        `The directory ${dirPath} does not contain enough files to combine.`
      );
    }
  }
}

class ImageProcessor {
  static async processImage(filePath) {
    try {
      console.log(`Processing image ${filePath}`);
      const result = await Tesseract.recognize(filePath, 'eng', {
        logger: m => m,
        tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK,
        tessedit_char_whitelist:
          '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
      });
      const lines = result.data.text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line);
      return lines.map(line => {
        line = line.replace(/[^a-zA-Z0-9\s]/g, ' ');
        const [id, ...nameParts] = line.split(' ');
        const name = nameParts.join(' ');
        const validId = id.length <= 4 ? id : id.slice(0, 4);
        let idConNombre = `${validId}\t${name}`.trim();
        return idConNombre.includes('END OF DATA') ? '' : idConNombre;
      });
    } catch (error) {
      console.error(`Error processing the image ${filePath}:`, error);
      return null;
    }
  }
}

class FileManager {
  static async readFile(folderPath) {
    const combinedImagePath = path.join(folderPath, 'combined_image.png');
    if (!fs.existsSync(combinedImagePath)) {
      console.error(
        'The combined image file does not exist:',
        combinedImagePath
      );
      return null;
    }
    const fileDataArray = await ImageProcessor.processImage(combinedImagePath);
    return fileDataArray.join('\n');
  }

  static async writeFiles(data, outputFile) {
    fs.writeFile(outputFile, data, err => {
      if (err) {
        console.error('Error writing the output file:', err);
        return;
      }
      console.log(`Data successfully transcribed: ${outputFile}`);
    });
  }
}

class ImageCombiner {
  static async combineImages(tienda) {
    const python = 'python';
    const scriptPath = path.join(__dirname, 'combine.py');
    const command = `${python} ${scriptPath} ${tienda}`;
    console.log(`Executing: ${command}`);
    execSync(command, { stdio: 'inherit' });
  }
}

class ProcessManager {
  constructor(tiendas) {
    this.tiendas = tiendas;
    this.config = new Configuration();
  }

  async processAll() {
    for (const tienda of this.tiendas) {
      const inputFolderPath = this.config.getInputFolderPath(tienda);
      const outputFolderPath = this.config.getOutputFolderPath(tienda);
      const outputFile = this.config.getOutputFilePath(tienda);
      const tiendaFolderPath = path.join(inputFolderPath, '..');

      try {
        DirectoryManager.checkDirExists(outputFolderPath);
        DirectoryManager.checkDirExists(inputFolderPath);
        DirectoryManager.checkFolderNotEmpty(tiendaFolderPath);
      } catch (err) {
        console.error(err);
        continue;
      }

      await ImageCombiner.combineImages(tienda);
      const imagenCombinada = await FileManager.readFile(inputFolderPath);
      if (imagenCombinada) {
        await FileManager.writeFiles(imagenCombinada, outputFile);
      }
    }
  }
}

(async () => {
  const manager = new ProcessManager(TIENDAS);
  await manager.processAll();
})();
