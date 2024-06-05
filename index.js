const fs = require("fs");
const path = require("path");
const Tesseract = require("tesseract.js");

const CC = "5017";

const folderPath = path.join(__dirname, "images", CC);
const outputPath = "output.txt";

// Función para procesar una imagen y extraer texto usando Tesseract.js
async function processImage(filePath) {
  try {
    const result = await Tesseract.recognize(filePath, "eng", {
      logger: (m) => console.log(m),
    });

    // Suponiendo que el texto extraído está en el formato 'ID Nombre'
    const lines = result.data.text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);
    return lines.map((line) => {
      const [id, ...nameParts] = line.split(" ");
      const name = nameParts.join(" ");
      const validId = id.length <= 4 ? id : id.slice(0, 4);
      return `${validId}\t${name}`;
    });
  } catch (error) {
    console.error(`Error procesando la imagen ${filePath}:`, error);
    return [];
  }
}

// Leer todos los archivos en la carpeta
fs.readdir(folderPath, async (err, files) => {
  if (err) {
    console.error("Error leyendo la carpeta de imágenes:", err);
    return;
  }

  let dataArray = [];

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
      const fileDataArray = await processImage(filePath);
      dataArray = dataArray.concat(fileDataArray);
    }
  }

  // Convertir el array a string con saltos de línea y escribir en output.txt
  const data = dataArray.join("\n");
  fs.writeFile(outputPath, data, (err) => {
    if (err) {
      console.error("Error escribiendo el archivo de salida:", err);
      return;
    }
    console.log("Datos transcritos exitosamente a output.txt");
  });
});
