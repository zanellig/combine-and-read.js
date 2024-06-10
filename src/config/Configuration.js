const path = require('path');

class Configuration {
  constructor() {
    if (Configuration.instance) {
      return Configuration.instance;
    }
    this.basePath = path.join(__dirname, '..', '..', 'public');
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

module.exports = Configuration;
