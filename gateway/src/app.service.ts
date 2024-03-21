import { Inject, Injectable } from '@nestjs/common';
import { CreateUserRequest } from './create-user-request.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
    @Inject('VIEW_SERVICE') private readonly viewServiceClient: ClientProxy,
  ) {}
  private readonly users = [];

  async getHello() {
    return `Hello`;
  }

  createUser(user: CreateUserRequest) {
    this.mainServiceClient.emit('createUser', user);
  }
}
