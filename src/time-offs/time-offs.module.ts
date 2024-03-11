import { Module } from '@nestjs/common';
import { TimeOffsService } from './time-offs.service';
import { TimeOffsController } from './time-offs.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TimeOffsController],
  providers: [TimeOffsService],
})
export class TimeOffsModule {}
