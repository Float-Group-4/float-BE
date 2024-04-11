import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RolesService {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'create_role' }, createRoleDto),
    );
  }

  findAll() {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_all_roles' }, {}),
    );
  }

  findByTeamId(teamId: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_roles_by_team_id' }, teamId),
    );
  }

  findOne(id: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_role_by_id' }, id),
    );
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
