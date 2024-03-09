import { Module } from '@nestjs/common';
import { TimeOffTypesService } from './time-off-types.service';
import { TimeOffTypesController } from './time-off-types.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TimeOffTypesController],
  providers: [TimeOffTypesService],
})
export class TimeOffTypesModule {}
