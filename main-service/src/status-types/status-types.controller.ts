import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateStatusTypeDto } from './dto/create-status-type.dto';
import { UpdateStatusTypeDto } from './dto/update-status-type.dto';
import { StatusTypesService } from './status-types.service';

@Controller('status-types')
export class StatusTypesController {
  constructor(private readonly statusTypesService: StatusTypesService) {}

  @MessagePattern({ cmd: 'create_status_type' })
  create(createStatusTypeDto: CreateStatusTypeDto) {
    return this.statusTypesService.create(createStatusTypeDto);
  }

  @MessagePattern({ cmd: 'find_all_status_types' })
  findAll() {
    return this.statusTypesService.findAll();
  }

  @MessagePattern({ cmd: 'find_status_type_by_id' })
  findOne(id: string) {
    return this.statusTypesService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_status_type' })
  update({
    id,
    updateStatusTypeDto,
  }: {
    id: string;
    updateStatusTypeDto: UpdateStatusTypeDto;
  }) {
    return this.statusTypesService.update(id, updateStatusTypeDto);
  }

  @MessagePattern({ cmd: 'remove_status_type' })
  remove(id: string) {
    return this.statusTypesService.remove(id);
  }
}
