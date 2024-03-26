import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RolesService {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'create_role' }, createRoleDto),
    );
  }

  async findAll() {
    const cachedData = await this.cacheService.get('find_all_roles');
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }
    const data = firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_all_roles' }, {}),
    );
    await this.cacheService.set('find_all_roles', data);
    return data;
  }

  async findOne(id: string) {
    const cachedData = await this.cacheService.get(`find_role_by_id_${id}`);
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }
    const data = firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_role_by_id' }, id),
    );
    await this.cacheService.set(`find_role_by_id_${id}`, data);
    return data;
  }

  update(id: string, updateRoleDto: UpdateRoleDto) {
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'update_role' },
        { id, updateRoleDto },
      ),
    );
  }

  remove(id: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'remove_role' }, id),
    );
  }
}
