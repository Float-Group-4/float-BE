import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
@ApiTags('Users')
export class UsersService {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  create(createUserDto: CreateUserDto) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'create_user' }, createUserDto),
    );
  }

  async findAll() {
    const cachedData = await this.cacheService.get('find_all_users');
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }
    const data = firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_all_users' }, {}),
    );
    await this.cacheService.set('find_all_users', data);
    return data;
  }

  async findOne(id: string) {
    const cachedData = await this.cacheService.get(`find_user_by_id_${id}`);
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }
    const data = firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_user_by_id' }, id),
    );
    await this.cacheService.set(`find_user_by_id_${id}`, data);
    return data;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'update_user' },
        { id, updateUserDto },
      ),
    );
  }

  remove(id: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'remove_user' }, id),
    );
  }
}
