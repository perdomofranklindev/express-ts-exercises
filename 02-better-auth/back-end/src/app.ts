import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { authRouter } from '@modules/auth/auth.routes';
import { userRouter } from '@modules/user/user.routes';
import { envConfig } from '@shared/config/env.config';
import { authMiddleware } from '@modules/auth/auth.middleware';

// Create Express application
const app: Application = express();

// Security middleware
app.use(helmet());

// Middleware
app.use(
  cors({
    origin: envConfig.corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.json());

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Express + TypeScript Server' });
});

app.use('/api/auth', authRouter);
app.use(authMiddleware); // <- From here the endpoints below are protected.
app.use('/api/user', userRouter);

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
    ...(envConfig.environment === 'development' && { stack: err.stack }),
  });
});

export default app;
