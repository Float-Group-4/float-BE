import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivitiesController } from './acitvities/activities.controller';
import { ActivitiesService } from './acitvities/activities.service';
import { ProjectMemberController } from './project-member/project-member.controller';
import { ProjectMemberService } from './project-member/project-member.service';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MAIN_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 4001,
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
  controllers: [
    AppController,
    ActivitiesController,
    ProjectMemberController,
    TaskController,
  ],
  providers: [AppService, ActivitiesService, ProjectMemberService, TaskService],
})
export class AppModule {}
