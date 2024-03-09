import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { SettingsModule } from './settings/settings.module';
import { TimeOffsModule } from './time-offs/time-offs.module';
import { TimeOffTypesModule } from './time-off-types/time-off-types.module';
import { ActivitiesModule } from './acitvities/activities.module';
import { RolesModule } from './roles/roles.module';
import { DepartmentsModule } from './departments/departments.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    TeamsModule,
    SettingsModule,
    TimeOffsModule,
    TimeOffTypesModule,
    ActivitiesModule,
    RolesModule,
    DepartmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
