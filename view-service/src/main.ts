import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TcpOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: 'view-service',
      port: 4002,
    },
  } as TcpOptions);

  await app.listen();
}
bootstrap();
