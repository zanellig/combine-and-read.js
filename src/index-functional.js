const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const Tesseract = require('tesseract.js');
const { TIENDAS } = require('./tiendas.js');

main().catch(console.error);

async function main() {
  for (const TIENDA of TIENDAS) {
    const INPUT_FOLDER_PATH = path.join(
      __dirname,
      '..',
      'public',
      'images',
      TIENDA,
      'combined'
    );
    const TIENDA_FOLDER_PATH = path.join(INPUT_FOLDER_PATH, '..');
    const OUTPUT_FOLDER_PATH = path.join(
      __dirname,
      '..',
      'public',
      'output',
      TIENDA
    );
    const OUTPUT_FILE = path.join(OUTPUT_FOLDER_PATH, `${TIENDA}-output.txt`);

    try {
      checkDirExists(OUTPUT_FOLDER_PATH);
      checkDirExists(INPUT_FOLDER_PATH);
      checkFolderNotEmpty(TIENDA_FOLDER_PATH);
    } catch (err) {
      console.error(err);
      continue;
    }

    await combineImagesPY(TIENDA);
    const imagenCombinada = await readFile(INPUT_FOLDER_PATH);
    if (imagenCombinada) {
      await writeFiles(imagenCombinada, OUTPUT_FILE);
    }
  }
}

// Function to process an image and extract text using Tesseract.js
async function processImage(filePath) {
  try {
    console.log(`Processing image ${filePath}`);

    const result = await Tesseract.recognize(filePath, 'eng', {
      logger: m => m,
      tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK,
      tessedit_char_whitelist:
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
    });

    // Assuming the extracted text is in the format 'ID Name'
    const lines = result.data.text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line);
    return lines.map(line => {
      // Remove all non-alphanumeric characters from the line
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

async function readFile(folderPath) {
  const combinedImagePath = path.join(folderPath, 'combined_image.png');
  if (!fs.existsSync(combinedImagePath)) {
    console.error('The combined image file does not exist:', combinedImagePath);
    return null;
  }

  const fileDataArray = await processImage(combinedImagePath);
  return fileDataArray.join('\n');
}

async function writeFiles(data, outputFile) {
  fs.writeFile(outputFile, data, err => {
    if (err) {
      console.error('Error writing the output file:', err);
      return;
    }
    console.log(`Data successfully transcribed: ${outputFile}`);
  });
}

async function combineImagesPY(tienda) {
  const python = 'python';
  const scriptPath = path.join(__dirname, 'combine.py');
  const command = `${python} ${scriptPath} ${tienda}`;
  console.log(`Executing: ${command}`);
  execSync(command, { stdio: 'inherit' });
}

async function checkDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.error('The directory does not exist:', dirPath);
    createDir(dirPath);
  }
  return dirPath;
}

async function createDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
  console.log('Directory created:', dirPath);
}

function checkFolderNotEmpty(dirPath) {
  const files = fs.readdirSync(dirPath);
  if (files.length < 2) {
    throw new Error(
      `The directory ${dirPath} does not contain enough files to combine.`
    );
  }
}
