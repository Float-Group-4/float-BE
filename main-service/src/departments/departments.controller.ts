import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller()
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @MessagePattern('create_department')
  create(createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @MessagePattern('find_all_departments')
  findAll() {
    return this.departmentsService.findAll();
  }

  @MessagePattern('find_department_by_id')
  findOne(id: string) {
    return this.departmentsService.findOne(id);
  }

  @MessagePattern('update_department')
  update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentsService.update(id, updateDepartmentDto);
  }

  @MessagePattern('remove_department')
  remove(id: string) {
    return this.departmentsService.remove(id);
  }
}
