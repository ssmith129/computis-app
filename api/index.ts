import serverless = require('serverless-http');

type ExpressApp = any;

function tryRequire(path: string) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require(path);
  } catch (e) {
    return undefined;
  }
}

function resolveApp(): ExpressApp {
  const candidates = [
    '../server',
    '../server/index',
    '../server/index.ts',
    '../server/index.js',
    '../server/server',
    '../server/server.ts',
    '../server/server.js',
    './server',
    '../dist/server/production.mjs'
  ];
  for (const p of candidates) {
    const mod = tryRequire(p);
    if (!mod) continue;
    if (typeof mod.createServer === 'function') {
      const app = mod.createServer();
      if (app) return app;
    }
    if (typeof mod.default === 'function') {
      try {
        const app = mod.default();
        if (app) return app;
      } catch {}
    }
    if (mod.default && (typeof mod.default.use === 'function' || typeof mod.default.listen === 'function')) {
      return mod.default;
    }
    if (mod.app && (typeof mod.app.use === 'function')) return mod.app;
    if (typeof mod.use === 'function') return mod;
  }
  throw new Error('Could not locate Express app factory. Ensure server exports createServer() or an Express app.');
}

const app = resolveApp();

export default serverless(app);