import { MessagePattern } from '@nestjs/microservices';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { SettingsService } from './settings.service';
import { Controller } from '@nestjs/common';
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @MessagePattern({ cmd: 'create_setting' })
  create(createSettingDto: CreateSettingDto) {
    return this.settingsService.create(createSettingDto);
  }

  @MessagePattern({ cmd: 'find_all_settings' })
  findAll() {
    return this.settingsService.findAll();
  }

  @MessagePattern({ cmd: 'find_setting_by_id' })
  findOne(id: string) {
    return this.settingsService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_setting' })
  update(id: string, updateSettingDto: UpdateSettingDto) {
    return this.settingsService.update(id, updateSettingDto);
  }

  @MessagePattern({ cmd: 'remove_setting' })
  remove(id: string) {
    return this.settingsService.remove(id);
  }
}
