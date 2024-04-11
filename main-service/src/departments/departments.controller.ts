import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
@Controller('departments')
@Controller()
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @MessagePattern({ cmd: 'create_department' })
  create(createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @MessagePattern({ cmd: 'find_all_departments' })
  findAll() {
    return this.departmentsService.findAll();
  }

  @MessagePattern({ cmd: 'find_department_by_id' })
  findOne(id: string) {
    return this.departmentsService.findOne(id);
  }

  @MessagePattern({ cmd: 'find_departments_by_team_id' })
  findByTeamId(teamId: string) {
    return this.departmentsService.findByTeamId(teamId);
  }

  @MessagePattern({ cmd: 'update_department' })
  update({
    id,
    updateDepartmentDto,
  }: {
    id: string;
    updateDepartmentDto: UpdateDepartmentDto;
  }) {
    return this.departmentsService.update(id, updateDepartmentDto);
  }

  @MessagePattern({ cmd: 'remove_department' })
  remove(id: string) {
    return this.departmentsService.remove(id);
  }
}
