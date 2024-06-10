const { TIENDAS } = require('./tiendas');
const ProcessManager = require('./ProcessManager');

(async () => {
  if (TIENDAS.length === 0) {
    throw new Error('No hay tiendas para procesar');
  }
  const manager = new ProcessManager(TIENDAS);
  await manager.processAll();
})();
