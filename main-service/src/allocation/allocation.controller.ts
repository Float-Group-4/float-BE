import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AllocationService } from './allocation.service';
import { CreateAllocationDto } from './dto/create-allocation.dto';
import { UpdateAllocationDto } from './dto/update-allocation.dto';

@Controller()
export class AllocationController {
  constructor(private readonly allocationService: AllocationService) {}

  @MessagePattern('create_allocation')
  create(createAllocationDto: CreateAllocationDto) {
    return this.allocationService.create(createAllocationDto);
  }

  @MessagePattern('find_all_allocations')
  findAll() {
    return this.allocationService.findAll();
  }

  @MessagePattern('find_allocation_by_id')
  findOne(id: string) {
    return this.allocationService.findOne(id);
  }

  @MessagePattern('update_allocation')
  update(id: string, updateAllocationDto: UpdateAllocationDto) {
    return this.allocationService.update(id, updateAllocationDto);
  }

  @MessagePattern('remove_allocation')
  remove(id: string) {
    return this.allocationService.remove(id);
  }
}
