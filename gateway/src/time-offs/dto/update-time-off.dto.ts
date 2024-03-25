import { PartialType } from '@nestjs/swagger';
import { CreateTimeOffDto } from './create-time-off.dto';

export class UpdateTimeOffDto extends PartialType(CreateTimeOffDto) {}
