import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { Controller } from '@nestjs/common';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'create_user' })
  create(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'find_all_users' })
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'find_user_by_id' })
  findOne(id: string) {
    return this.usersService.findOne(id);
  }

  @MessagePattern({ cmd: 'find_user_by_email' })
  findByEmail(email: string) {
    return this.usersService.findByEmail(email);
  }

  @MessagePattern({ cmd: 'update_user' })
  update({ id, updateUserDto }: { id: string; updateUserDto: UpdateUserDto }) {
    return this.usersService.update(id, updateUserDto);
  }

  @MessagePattern({ cmd: 'remove_user' })
  remove(id: string) {
    return this.usersService.remove(id);
  }
}
