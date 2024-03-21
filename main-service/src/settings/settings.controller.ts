import { MessagePattern } from '@nestjs/microservices';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { SettingsService } from './settings.service';

export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @MessagePattern('create_setting')
  create(createSettingDto: CreateSettingDto) {
    return this.settingsService.create(createSettingDto);
  }

  @MessagePattern('find_all_settings')
  findAll() {
    return this.settingsService.findAll();
  }

  @MessagePattern('find_setting_by_id')
  findOne(id: string) {
    return this.settingsService.findOne(id);
  }

  @MessagePattern('update_setting')
  update(id: string, updateSettingDto: UpdateSettingDto) {
    return this.settingsService.update(id, updateSettingDto);
  }

  @MessagePattern('remove_setting')
  remove(id: string) {
    return this.settingsService.remove(id);
  }
}
