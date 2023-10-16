import { PartialType } from '@nestjs/swagger';
import { CreateResponseFormDto } from './create-response-form.dto';

export class UpdateResponseFormDto extends PartialType(CreateResponseFormDto) {}
