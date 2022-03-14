let services: any = {};
const context = require.context('./', true, /\.ts$/);

context.keys().forEach((filename: string) => {
  if (filename === './index.ts') return;
  const obj = context(filename).default || {};
  services = { ...services, ...obj };
});

export { services };
