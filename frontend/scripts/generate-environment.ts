const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const apiUrl = process.env['API_URL'];

if (!apiUrl) {
  console.error('❌ API_URL est manquant!');
  process.exit(1);
}

const content = `
export const environment = {
  production: true,
  apiUrl: '${apiUrl}',
};
`;

const envDir = path.resolve(__dirname, '../environments');
const envPath = path.join(envDir, 'environment.ts');

if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

fs.writeFileSync(envPath, content);
