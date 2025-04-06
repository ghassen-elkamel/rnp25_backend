import { PartialType } from '@nestjs/swagger';
import { CreateOlmDto } from './create-olm.dto';

export class UpdateOlmDto extends PartialType(CreateOlmDto) {}
