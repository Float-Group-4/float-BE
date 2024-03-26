import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivitiesController } from './acitvities/activities.controller';
import { ActivitiesService } from './acitvities/activities.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MAIN_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 4001, //change to 3000 for nginx/docker
        },
      },
      {
        name: 'VIEW_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 4002,
        },
      },
      {
        name: 'MAILER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 4003,
        },
      },
    ]),
  ],
  controllers: [AppController, ActivitiesController],
  providers: [AppService, ActivitiesService],
})
export class AppModule {}
