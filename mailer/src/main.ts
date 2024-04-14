import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TcpOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: 'mailer',
      port: 4003,
    },
  } as TcpOptions);

  await app.listen();
}
bootstrap();
