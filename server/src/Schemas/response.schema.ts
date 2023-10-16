import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';
import { Form } from './form.schema';
import { ApiProperty } from '@nestjs/swagger';

export type ResponseFormDocument = mongoose.HydratedDocument<ResponseForm>;

@Schema({ timestamps: true })
export class ResponseForm {
  @Prop()
  @ApiProperty({ description: 'An array of answers', type: Array })
  answers: [];
  @ApiProperty({ description: 'this is formId', type: () => Form })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Form' })
  formId: Form;
  @ApiProperty({ description: 'this is userId', type: () => User })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;
}
export const ResponseFormSchema = SchemaFactory.createForClass(ResponseForm);
