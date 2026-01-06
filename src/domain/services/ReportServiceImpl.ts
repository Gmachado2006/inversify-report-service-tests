import { injectable, inject } from 'inversify';
import { faker } from '@faker-js/faker';
import { ReportService } from '../interfaces/ReportService';
import { Logger } from '../interfaces/Logger';
import { Mailer } from '../interfaces/Mailer';
import { InvalidReportSizeError } from '../errors/InvalidReportSizeError';
import { TYPES } from '../../types';

@injectable()
export class ReportServiceImpl implements ReportService {
  constructor(
    @inject(TYPES.Logger) private logger: Logger,
    @inject(TYPES.Mailer) private mailer: Mailer
  ) {}

  async generateAndSend(email: string, n: number): Promise<void> {

    if (n < 1 || n > 10) {
      throw new InvalidReportSizeError(`Número de registros deve estar entre 1 e 10. Recebido: ${n}`);
    }

    
    this.logger.info(`Iniciando geração de relatório com ${n} registros para ${email}`);

  
    const records = this.generateFakeData(n);

    const reportBody = this.formatReport(records);

   
    try {
      await this.mailer.send(email, 'Relatório de Dados Fictícios', reportBody);
      
     
      this.logger.info(`Relatório enviado com sucesso para ${email}`);
    } catch (error) {
      this.logger.error(`Falha ao enviar relatório: ${error}`);
      throw error;
    }
  }


  private generateFakeData(n: number): Array<{ nome: string; cidade: string }> {
    const records = [];
    
    for (let i = 0; i < n; i++) {
      records.push({
        nome: faker.person.fullName(),
        cidade: faker.location.city()
      });
    }

    return records;
  }

  private formatReport(records: Array<{ nome: string; cidade: string }>): string {
    let html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            table { border-collapse: collapse; width: 100%; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #4CAF50; color: white; }
            tr:nth-child(even) { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h2>Relatório de Dados Fictícios</h2>
          <p>Total de registros: ${records.length}</p>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Cidade</th>
              </tr>
            </thead>
            <tbody>
    `;

    records.forEach((record, index) => {
      html += `
              <tr>
                <td>${index + 1}</td>
                <td>${record.nome}</td>
                <td>${record.cidade}</td>
              </tr>
      `;
    });

    html += `
            </tbody>
          </table>
        </body>
      </html>
    `;

    return html;
  }
}