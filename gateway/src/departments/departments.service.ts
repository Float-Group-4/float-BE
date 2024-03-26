import { Inject, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
@ApiTags('Departments')
export class DepartmentsService {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  create(createDepartmentDto: CreateDepartmentDto) {
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'create_department' },
        createDepartmentDto,
      ),
    );
  }

  async findAll() {
    const cachedData = await this.cacheService.get('find_all_departments');
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }
    const data = firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_all_departments' }, {}),
    );
    await this.cacheService.set('find_all_departments', data);
    return data;
  }

  async findOne(id: string) {
    const cachedData = await this.cacheService.get(
      `find_department_by_id_${id}`,
    );
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }
    const data = firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_department_by_id' }, id),
    );
    await this.cacheService.set(`find_department_by_id_${id}`, data);
    return data;
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
