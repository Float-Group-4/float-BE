import { MessagePattern } from '@nestjs/microservices';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';
import { Controller } from '@nestjs/common';
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @MessagePattern({ cmd: 'create_role' })
  create(createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @MessagePattern({ cmd: 'find_all_roles' })
  findAll() {
    return this.rolesService.findAll();
  }

  @MessagePattern({ cmd: 'find_role_by_id' })
  findOne(id: string) {
    return this.rolesService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_role' })
  update({ id, updateRoleDto }: { id: string; updateRoleDto: UpdateRoleDto }) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @MessagePattern({ cmd: 'remove_role' })
  remove(id: string) {
    return this.rolesService.remove(id);
  }
}
