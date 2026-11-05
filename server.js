import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const buildDir = path.join(currentDir, 'dist');

app.use(express.static(buildDir));
app.get('*', (_request, response) => {
  response.sendFile(path.join(buildDir, 'index.html'));
});

const port = Number(process.env.PORT) || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log(`FAMILIA is listening on port ${port}`);
});
