// schedule.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { caculationService } from './caculation.service';

describe('caculation Duration', () => {
  let service: caculationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [caculationService],
    }).compile();

    service = module.get<caculationService>(caculationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('calculateDuration', () => {
    it('should calculate duration correctly when endDate is after startDate', () => {
      const startDate = new Date('2024-03-18');
      const endDate = new Date('2024-03-22');
      const result = service.calculateDuration(startDate, endDate);
      expect(result).toBe(4); // 5 days difference between the two dates
    });

    it('should calculate duration correctly when endDate is before startDate', () => {
      const startDate = new Date('2024-03-22');
      const endDate = new Date('2024-03-18');
      const result = service.calculateDuration(startDate, endDate);
      expect(result).toBe(-999); // 5 days difference between the two dates
    });

    it('should handle same startDate and endDate correctly', () => {
      const startDate = new Date('2024-03-18');
      const endDate = new Date('2024-03-18');
      const result = service.calculateDuration(startDate, endDate);
      expect(result).toBe(0); // 0 days difference between the two dates
    });
  });
});
