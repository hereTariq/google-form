import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import mongoose from 'mongoose';

export class CreateFormDto {
  @ApiProperty({ description: 'this is form title', type: String })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'this is form description', type: String })
  @IsNotEmpty()
  @IsString()
  description: string;
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        // other properties of the object go here
      },
    },
  })
  // @ApiProperty({ description: 'this is form title', type: Array })
  @IsNotEmpty()
  @IsArray()
  formFields: [];
  @IsNotEmpty()
  @ApiProperty({
    description: 'this is userId',
    type: String,
  })
  @IsMongoId()
  userId: string;
}
