import { PartialType } from '@nestjs/mapped-types';
import { CreateFormDto } from './create-form.dto';

export class UpdateFormDto {
  title: string;
  description: string;
  formFields: [];
}
