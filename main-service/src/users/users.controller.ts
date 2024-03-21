import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('create_user')
  create(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern('find_all_users')
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern('find_user_by_id')
  findOne(id: string) {
    return this.usersService.findOne(id);
  }

  @MessagePattern('update_user')
  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @MessagePattern('remove_user')
  remove(id: string) {
    return this.usersService.remove(id);
  }
}
