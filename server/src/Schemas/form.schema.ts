import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { ApiProperty } from '@nestjs/swagger';

export type formDocument = HydratedDocument<Form>;

@Schema({ timestamps: true })
export class Form {
  @ApiProperty({ description: 'this is form title', type: String })
  @Prop()
  title: string;
  @Prop()
  @ApiProperty({ description: 'this is form title', type: String })
  description: string;
  @Prop()
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
  formFields: [];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @ApiProperty({ description: 'this is userId', type: () => User })
  userId: User;
}

export const formSchema = SchemaFactory.createForClass(Form);
