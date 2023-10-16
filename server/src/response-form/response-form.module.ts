import { Module } from '@nestjs/common';
import { ResponseFormService } from './response-form.service';
import { ResponseFormController } from './response-form.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ResponseForm, ResponseFormSchema } from '../Schemas/response.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ResponseForm.name, schema: ResponseFormSchema },
    ]),
  ],
  controllers: [ResponseFormController],
  providers: [ResponseFormService],
})
export class ResponseFormModule {}
