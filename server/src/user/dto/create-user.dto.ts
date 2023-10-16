import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'this is username', type: String })
  @IsNotEmpty()
  @IsString()
  username: string;
  @ApiProperty({ description: 'this is email', type: String })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @ApiProperty({ description: 'this is password', type: String })
  @IsNotEmpty()
  @IsString()
  password: string;
}
