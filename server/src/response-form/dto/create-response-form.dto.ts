import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';
import { Form } from 'src/Schemas/form.schema';
import { User } from 'src/Schemas/user.schema';

export class CreateResponseFormDto {
  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ description: 'An array of answers', type: Array })
  answers: [];
  @ApiProperty({ description: 'this is formId', type: () => Form })
  @IsNotEmpty()
  @IsMongoId()
  formId: Form;
  @ApiProperty({ description: 'this is userId', type: () => User })
  @IsNotEmpty()
  @IsMongoId()
  userId: User;
}
