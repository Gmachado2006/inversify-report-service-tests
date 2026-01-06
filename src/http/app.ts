import express, { Express, Request, Response } from 'express';
import { Container } from 'inversify';
import { ReportController } from './controllers/ReportController';
import { TYPES } from '../types';


export function createApp(container: Container): Express {
  const app: Express = express();

  app.use(express.json());

  app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', environment: process.env.APP_ENV || 'dev' });
  });

  app.get('/relatorio/:n', async (req: Request, res: Response) => {
    const controller = container.get<ReportController>(TYPES.ReportController);
    await controller.handle(req, res);
  });

  app.use((req: Request, res: Response) => {
    res.status(404).json({
      error: 'Not Found',
      message: 'Rota não encontrada'
    });
  });

  return app;
}