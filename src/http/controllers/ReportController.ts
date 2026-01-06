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

 
  async handle(req: Request, res: Response): Promise<void> {
    try {

      const n = parseInt(req.params.n);
      const email = req.query.email as string;

  
      if (!email) {
        res.status(400).json({
          error: 'Bad Request',
          message: 'O parâmetro "email" é obrigatório na query string'
        });
        return;
      }

      
      if (!this.isValidEmail(email)) {
        res.status(400).json({
          error: 'Bad Request',
          message: 'Formato de e-mail inválido'
        });
        return;
      }

  
      if (isNaN(n)) {
        res.status(400).json({
          error: 'Bad Request',
          message: 'O parâmetro "n" deve ser um número válido'
        });
        return;
      }

     
      await this.reportService.generateAndSend(email, n);

     
      res.status(200).json({
        message: 'Relatório gerado e enviado com sucesso',
        email,
        records: n
      });

    } catch (error) {
      if (error instanceof InvalidReportSizeError) {
        res.status(400).json({
          error: 'Bad Request',
          message: error.message
        });
        return;
      }

      console.error('Erro interno:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Ocorreu um erro ao processar sua solicitação'
      });
    }
  }

 
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}