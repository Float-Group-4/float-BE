import { MessagePattern } from '@nestjs/microservices';
import { StatusService } from './status.service';
import { Controller } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('time-offs')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @MessagePattern({ cmd: 'create_status' })
  create(createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto);
  }

  @MessagePattern({ cmd: 'find_all_statuses' })
  findAll() {
    return this.statusService.findAll();
  }

  @MessagePattern({ cmd: 'find_statuses_by_team_id' })
  findAllStatusByTeamId(teamId: string) {
    return this.statusService.findAllStatusByTeamId(teamId);
  }

  @MessagePattern({ cmd: 'find_status_by_id' })
  findOne(id: string) {
    return this.statusService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_status' })
  update({
    id,
    updateStatusDto,
  }: {
    id: string;
    updateStatusDto: UpdateStatusDto;
  }) {
    return this.statusService.update(id, updateStatusDto);
  }

  @MessagePattern({ cmd: 'remove_status' })
  remove(id: string) {
    return this.statusService.remove(id);
  }
}
