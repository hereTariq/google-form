import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @ApiProperty({ description: 'this is username', type: String })
  @Prop()
  username: string;
  @ApiProperty({ description: 'this is email', type: String })
  @Prop()
  email: string;
  @ApiProperty({ description: 'this is password', type: String })
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
