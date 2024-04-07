import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! from main-service';
  }

  getMainServiceHealth(): string {
    return 'Main service is alive';
  }
}
