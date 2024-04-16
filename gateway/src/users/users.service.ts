import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
@ApiTags('Users')
export class UsersService {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
  ) {}

  create(createUserDto: CreateUserDto) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'create_user' }, createUserDto),
    );
  }

  findAll() {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_all_users' }, {}),
    );
  }

  findOne(id: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_user_by_id' }, id),
    );
  }

  findByEmail(email: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_user_by_email' }, email),
    );
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
