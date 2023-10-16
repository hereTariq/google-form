import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { Form, formSchema } from '../Schemas/form.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Form.name, schema: formSchema }]),
  ],
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
