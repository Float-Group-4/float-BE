import { Inject, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
@ApiTags('Departments')
export class DepartmentsService {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
  ) {}

  create(createDepartmentDto: CreateDepartmentDto) {
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'create_department' },
        createDepartmentDto,
      ),
    );
  }

  findAll() {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_all_departments' }, {}),
    );
  }

  findByTeamId(teamId: string) {
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'find_departments_by_team_id' },
        teamId,
      ),
    );
  }

  findOne(id: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_department_by_id' }, id),
    );
  }

  update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'update_department' },
        { id, updateDepartmentDto },
      ),
    );
  }

  remove(id: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'remove_department' }, id),
    );
  }
}
