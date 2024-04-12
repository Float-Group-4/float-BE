import { PartialType } from '@nestjs/swagger';
import { CreateStatusTypeDto } from './create-status-type.dto';

export class UpdateStatusTypeDto extends PartialType(CreateStatusTypeDto) {}
