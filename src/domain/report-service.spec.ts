import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ReportService } from './interfaces/ReportService'; 
import { InvalidReportSizeError } from './errors/InvalidReportSizeError'; 

describe('ReportService', () => {
  const mockLogger = { log: vi.fn(), error: vi.fn() };
  const mockMailer = { send: vi.fn().mockResolvedValue(true) };

  let service: ReportService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new ReportService(mockLogger as any, mockMailer as any);
  });

  it('deve lançar InvalidReportSizeError para n < 0 ou n > 10', async () => {
    await expect(service.generate(-5, 'test@test.com'))
      .rejects.toThrow(InvalidReportSizeError);
    
    await expect(service.generate(15, 'test@test.com'))
      .rejects.toThrow(InvalidReportSizeError);
  });

  it('deve chamar o mailer.send quando o relatório for válido', async () => {
    const email = 'user@example.com';
    await service.generate(5, email);

    expect(mockMailer.send).toHaveBeenCalledWith(
      expect.stringContaining(email), 
      expect.any(String)
    );
  });
});