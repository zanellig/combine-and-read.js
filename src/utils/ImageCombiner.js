const { execSync } = require('child_process');
const path = require('path');

class ImageCombiner {
  static async combineImages(tienda) {
    const python = 'python';
    const scriptPath = path.join(__dirname, '..', 'combine.py');
    const command = `${python} ${scriptPath} ${tienda}`;
    console.log(`Executing: ${command}`);
    execSync(command, { stdio: 'inherit' });
  }
}

module.exports = ImageCombiner;
