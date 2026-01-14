import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { ReportService } from '../../domain/interfaces/ReportService';
import { InvalidReportSizeError } from '../../domain/errors/InvalidReportSizeError';
import { TYPES } from '../../types';

@injectable()
export class ReportController {
  constructor(
    @inject(TYPES.ReportService) private reportService: ReportService
  ) {}

 
async handle(req: Request, res: Response) {
  try {
    const n = req.query?.n;
    const email = req.query?.email;

    if (!n || !email) {
       return res.status(400).json({ error: "Parâmetros ausentes" });
    }

    await this.reportService.generate(Number(n), String(email));
    return res.status(200).json({ message: 'OK' });
    
  } catch (error: any) {
    if (error instanceof InvalidReportSizeError || error.name === 'InvalidReportSizeError') {
      return res.status(400).json({ error: error.message });
    }
    
    console.error("Erro capturado no catch:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
}