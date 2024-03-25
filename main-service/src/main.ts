import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { AllExceptionsFilter } from './all-exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: parseInt(process.env.SERVER_PORT, 10) || 3000,
    },
  } as TcpOptions);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  console.log("Server started at " + process.env.SERVER_PORT);
  await app.listen();
}
bootstrap();
