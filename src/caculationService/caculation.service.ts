import { Injectable } from '@nestjs/common';

@Injectable()
export class caculationService {
  calculateDuration(startDate: Date, endDate: Date): number {
    if (endDate.getTime() - startDate.getTime() < 0) return -999;
    const diffInMilliseconds = Math.abs(
      endDate.getTime() - startDate.getTime(),
    );
    const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
    return diffInDays;
  }
}
