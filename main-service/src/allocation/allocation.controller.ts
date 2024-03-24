import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AllocationService } from './allocation.service';
import { CreateAllocationDto } from './dto/create-allocation.dto';
import { UpdateAllocationDto } from './dto/update-allocation.dto';

@Controller()
export class AllocationController {
  constructor(private readonly allocationService: AllocationService) {}

  @MessagePattern({ cmd: 'create_allocation' })
  create(createAllocationDto: CreateAllocationDto) {
    return this.allocationService.create(createAllocationDto);
  }

  @MessagePattern({ cmd: 'find_all_allocations' })
  findAll() {
    return this.allocationService.findAll();
  }

  @MessagePattern({ cmd: 'find_allocation_by_id' })
  findOne(id: string) {
    return this.allocationService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_allocation' })
  update(id: string, updateAllocationDto: UpdateAllocationDto) {
    return this.allocationService.update(id, updateAllocationDto);
  }

  @MessagePattern({ cmd: 'remove_allocation' })
  remove(id: string) {
    return this.allocationService.remove(id);
  }
}
