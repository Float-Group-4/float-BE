import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { AllocationService } from './allocation.service';
import { CreateAllocationDto } from './dto/create-allocation.dto';
import { UpdateAllocationDto } from './dto/update-allocation.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('allocation')
@ApiTags('Allocation')
export class AllocationController {
  constructor(private readonly allocationService: AllocationService) {}

  @Post()
  create(@Body() createAllocationDto: CreateAllocationDto) {
    return this.allocationService.create(createAllocationDto);
  }
  @Get()
  @UseInterceptors(CacheInterceptor)
  findAll() {
    return this.allocationService.findAll();
  }
  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  findOne(@Param() id: string) {
    return this.allocationService.findOne(id);
  }
  @Patch(':id')
  update(
    @Param() id: string,
    @Body() updateAllocationDto: UpdateAllocationDto,
  ) {
    return this.allocationService.update(id, updateAllocationDto);
  }
  @Delete(':id')
  remove(@Param() id: string) {
    return this.allocationService.remove(id);
  }
}
