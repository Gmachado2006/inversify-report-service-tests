import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ReportController } from './ReportController';
import { InvalidReportSizeError } from '../../domain/errors/InvalidReportSizeError';

describe('ReportHttpAdapter', () => {
  const mockService = {
    generate: vi.fn(),
  };

  let adapter: ReportController;

  let mockRes: any;

  beforeEach(() => {
    vi.clearAllMocks();
    adapter = new ReportController(mockService as any);
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
  });

it('deve responder com status 400 quando o domínio lançar InvalidReportSizeError', async () => {
  const mockReq = { 
    query: { 
      n: '15', 
      email: 'user@test.com' 
    } 
  };
  
  mockService.generate.mockRejectedValue(new InvalidReportSizeError());

  await adapter.handle(mockReq as any, mockRes as any);

  expect(mockRes.status).toHaveBeenCalledWith(400);
});

  it('deve responder com status 500 para erros desconhecidos', async () => {
    const mockReq = { query: { n: '5', email: 'user@test.com' } };
    
    mockService.generate.mockRejectedValue(new Error('Generic Error'));

    await adapter.handle(mockReq as any, mockRes as any);

    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});