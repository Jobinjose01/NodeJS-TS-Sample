import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';
import fs from 'fs';
import path from 'path';

const swaggerFile = path.resolve(__dirname, 'swagger.json');
const swaggerData = fs.readFileSync(swaggerFile, 'utf8');
const swaggerDocument = JSON.parse(swaggerData);

const setupSwagger = (app: Application) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default setupSwagger;
