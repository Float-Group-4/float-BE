import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app = (await NestFactory.create(AppModule, {
    cors: true,
  })) as INestApplication<any>;
  // set up swagger
  const config = new DocumentBuilder()
    .setTitle('Gateway')
    .setDescription('The gateway API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(4000);
}
bootstrap();
