const fs = require('fs');
const path = require('path');
const ImageProcessor = require('./ImageProcessor');

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

module.exports = FileManager;
