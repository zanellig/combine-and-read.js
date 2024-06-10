// const Tesseract = require('tesseract.js');

// class ImageProcessor {
//   static async processImage(filePath) {
//     try {
//       console.log(`Processing image ${filePath}`);
//       const result = await Tesseract.recognize(filePath, undefined, {
//         logger: m => m,
//         tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK,
//         tessedit_char_whitelist:
//           '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
//         tessedit_ocr_engine_mode: Tesseract.OEM.LSTM_ONLY,
//       });
//       const lines = result.data.text
//         .split('\n')
//         .map(line => line.trim())
//         .filter(line => line);
//       return lines.map(line => {
//         line = line.replace(/[^a-zA-Z0-9\s]/g, ' ').trim();
//         const [id, ...nameParts] = line.split(' ');
//         const name = nameParts.join(' ').trim();
//         const validId = id.length >= 1 && id.length <= 4 ? id.trim() : '';
//         console.log(
//           `id: ${validId} | id.length: ${validId.length}, name: ${name} | name.length: ${name.length}`
//         );
//         let idConNombre = `${validId}\t${name}`.trim();
//         return idConNombre.includes('END OF DATA') ? '' : idConNombre;
//       });
//     } catch (error) {
//       console.error(`Error processing the image ${filePath}:`, error);
//       return null;
//     }
//   }
// }

// module.exports = ImageProcessor;
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
        tessedit_ocr_engine_mode: Tesseract.OEM.LSTM_ONLY,
        tessjs_create_hocr: false,
        tessjs_create_tsv: false,
        tessjs_create_box: false,
        tessjs_create_unlv: false,
        tessjs_create_pdf: false,
        tessjs_create_config: {
          preserve_interword_spaces: '1',
          user_defined_dpi: '300',
        },
      });

      const lines = result.data.text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line);

      return lines.map(line => {
        line = line.replace(/[^a-zA-Z0-9\s]/g, ' ').trim();
        const [id, ...nameParts] = line.split(' ');
        const name = nameParts.join(' ').trim();
        const validId = id.length >= 1 && id.length <= 4 ? id.trim() : '';
        console.log(
          `id: ${validId} | id.length: ${validId.length}, name: ${name} | name.length: ${name.length}`
        );
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
