import express from 'express';
import dotenv from 'dotenv';
import v1Routes from './routes/v1';
import { PrismaClient } from '@prisma/client';
import setupSwagger from './config/swaggerConfig';

// Load environment variables from .env file
dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(v1Routes);

// Swagger setup
setupSwagger(app);

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
