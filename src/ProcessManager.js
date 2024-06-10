const path = require('path');
const Configuration = require('./config/Configuration');
const DirectoryManager = require('./utils/DirectoryManager');
const FileManager = require('./utils/FileManager');
const ImageCombiner = require('./utils/ImageCombiner');
const { TIENDAS } = require('./tiendas');

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

module.exports = ProcessManager;
