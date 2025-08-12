import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { webhookConsumerRouter } from '@modules/webhooks/webhook-consumer.routes';
import { environmentEnvRouter } from '@modules/environment-envs/environment-env.routes';

// Load environment variables
dotenv.config();

// Create Express application
const app: Application = express();

// Security middleware
app.use(helmet());

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Basic route
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Express + TypeScript Server' });
});

// Webhook
app.use('/api/environment-variables', environmentEnvRouter);
app.use('/api/webhook', webhookConsumerRouter);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
interface ErrorResponse extends Error {
  status?: number;
}

app.use((err: ErrorResponse, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || 'Internal server error';

  console.error(`[Error] ${status} - ${message}`);
  console.error(err.stack);

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

export default app;
