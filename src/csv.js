const CsvManager = require('./utils/CsvManager');
(async () => {
  const csvManager = new CsvManager();
  await csvManager.processTiendas();
  console.log(`Archivo CSV generado en: ${csvManager.outputFilePath}`);
})();
