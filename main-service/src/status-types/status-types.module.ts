import { Module } from '@nestjs/common';
import { StatusTypesService } from './status-types.service';
import { StatusTypesController } from './status-types.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StatusTypesController],
  providers: [StatusTypesService],
})
export class StatusTypesModule {}
