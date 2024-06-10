const fs = require('fs');

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

module.exports = DirectoryManager;
