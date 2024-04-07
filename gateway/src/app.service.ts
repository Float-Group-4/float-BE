import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
  ) {}

  async getHello() {
    return await firstValueFrom(
      this.mainServiceClient.send({ cmd: 'hello' }, {}),
    );
  }

  async getMainServiceHealth() {
    return await firstValueFrom(
      this.mainServiceClient.send({ cmd: 'health' }, {}),
    );
  }
}
