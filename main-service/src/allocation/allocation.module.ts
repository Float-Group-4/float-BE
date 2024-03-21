import { Module } from '@nestjs/common';
import { AllocationService } from './allocation.service';
import { AllocationController } from './allocation.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AllocationController],
  providers: [AllocationService],
  imports: [PrismaModule],
  exports: [AllocationService],
})
export class AllocationModule {}
