export class InvalidReportSizeError extends Error {
  constructor(message: string = 'Tamanho de relatório inválido. Máximo: 10 registros.') {
    super(message);
    this.name = 'InvalidReportSizeError';
    Object.setPrototypeOf(this, InvalidReportSizeError.prototype);
  }
}