const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const target = process.env['API_URL'];

if (!target) {
  throw new Error('API_URL est non déclarée !');
}

const proxyPath = path.resolve(__dirname, '../proxy.conf.json');

const proxyConfig: Record<string, unknown> = {
  '/api': {
    target,
    secure: false,
    pathRewrite: { '^/api': '' },
  },
};

fs.writeFileSync(proxyPath, JSON.stringify(proxyConfig, null, 2));
