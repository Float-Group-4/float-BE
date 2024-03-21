import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'hello' })
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('createUser')
  createUser(user: CreateUserDto) {
    console.log('MAIN_SERVICE createUser', user);
  }
}
