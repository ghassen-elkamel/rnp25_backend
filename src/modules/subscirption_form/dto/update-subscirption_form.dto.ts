import { PartialType } from '@nestjs/swagger';
import { CreateSubscirptionFormDto } from './create-subscirption_form.dto';

export class UpdateSubscirptionFormDto extends PartialType(CreateSubscirptionFormDto) {}
