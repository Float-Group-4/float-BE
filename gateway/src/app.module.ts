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
import { UsersController } from './users/users.controller';
import { TimeOffsController } from './time-offs/time-offs.controller';
// import { TeamsService } from './teams/teams.service';
import { TimeOffsService } from './time-offs/time-offs.service';
import { UsersService } from './users/users.service';
import { AllocationController } from './allocation/allocation.controller';
import { AllocationService } from './allocation/allocation.service';
import { DepartmentsService } from './departments/departments.service';
import { DepartmentsController } from './departments/departments.controller';
import { TimeOffTypesController } from './time-off-types/time-off-types.controller';
import { TimeOffTypesService } from './time-off-types/time-off-types.service';
import { TeamMembersController } from './team-members/team-members.controller';
import { TeamMembersService } from './team-members/team-members.service';
import { SettingsController } from './settings/settings.controller';
import { SettingsService } from './settings/settings.service';
import { ProjectController } from './project/project.controller';
import { ProjectService } from './project/project.service';
import { RolesService } from './roles/roles.service';
import { RolesController } from './roles/roles.controller';
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
    UsersController,
    AllocationController,
    TimeOffsController,
    ActivitiesController,
    TaskController,
    ProjectMemberController,
    DepartmentsController,
    TimeOffTypesController,
    TeamMembersController,
    SettingsController,
    ProjectController,
    RolesController,
    // TeamsController,
  ],
  providers: [
    AppService,
    ActivitiesService,
    ProjectMemberService,
    TaskService,
    UsersService,
    DepartmentsService,
    TimeOffsService,
    ActivitiesService,
    TaskService,
    ProjectMemberService,
    AllocationService,
    TimeOffTypesService,
    TeamMembersService,
    SettingsService,
    ProjectService,
    RolesService,
    // TeamsService,
  ],
})
export class AppModule {}
