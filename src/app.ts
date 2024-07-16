import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import i18n from './config/i18n';
import v1Routes from './routes/v1';
import { PrismaClient } from '@prisma/client';
import setupSwagger from './config/swaggerConfig';
import { errorHandler } from './middlewares/errorHandler';

// Load environment variables from .env file
dotenv.config();

const app = express();
const prisma = new PrismaClient();

//locale init
app.use(i18n.init);
//set locale from lang param
app.use((req, res, next) => {
  const lang = req.query.lang as string;
  if (lang) {
    res.setLocale(lang);
  } else {
    res.setLocale('en');
  }
  next();
});

app.use(express.json());
app.use(v1Routes);
// Swagger setup
setupSwagger(app);

app.use(errorHandler);
// Prisma clean shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export default app;
