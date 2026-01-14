export class ReportService {
  constructor(private logger: any, private mailer: any) {}

  async generate(size: number, email: string) { // mudei p0 para email para ficar claro
    if (size < 1 || size > 10) {
      const { InvalidReportSizeError } = await import('../errors/InvalidReportSizeError');
      throw new InvalidReportSizeError();
    }

    // AQUI ESTAVA O ERRO: você precisa passar os dados para o mailer
    const reportData = Array(size).fill({});
    await this.mailer.send(email, `Relatório com ${size} itens`);
    
    this.logger.log('generated', size);
    return reportData;
  }
}