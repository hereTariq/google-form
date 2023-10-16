import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @ApiProperty({ description: 'user email', type: String })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @ApiProperty({ description: 'user password', type: String })
  password: string;
}
