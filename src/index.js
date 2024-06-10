const { TIENDAS } = require('./tiendas');
const ProcessManager = require('./ProcessManager');

(async () => {
  const manager = new ProcessManager(TIENDAS);
  await manager.processAll();
})();
