const Tesseract = require('tesseract.js');

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

module.exports = ImageProcessor;
