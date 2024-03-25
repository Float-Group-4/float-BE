import { Inject, Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SettingsService {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
  ) {}

  create(createSettingDto: CreateSettingDto) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'create_setting' }, createSettingDto),
    );
  }

  findAll() {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_all_settings' }, {}),
    );
  }

  findOne(id: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_setting_by_id' }, id),
    );
  }

  update(id: string, updateSettingDto: UpdateSettingDto) {
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'update_setting' },
        { id, updateSettingDto },
      ),
    );
  }

  remove(id: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'remove_setting' }, id),
    );
  }
}
