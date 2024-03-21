import { MessagePattern } from '@nestjs/microservices';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';

export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @MessagePattern('create_role')
  create(createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @MessagePattern('find_all_roles')
  findAll() {
    return this.rolesService.findAll();
  }

  @MessagePattern('find_role_by_id')
  findOne(id: string) {
    return this.rolesService.findOne(id);
  }

  @MessagePattern('update_role')
  update(id: string, updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @MessagePattern('remove_role')
  remove(id: string) {
    return this.rolesService.remove(id);
  }
}
