import { PartialType } from '@nestjs/swagger';
import { CreateTimeOffTypeDto } from './create-time-off-type.dto';

export class UpdateTimeOffTypeDto extends PartialType(CreateTimeOffTypeDto) {}
