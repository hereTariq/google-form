import { Injectable } from '@nestjs/common';
import { CreateResponseFormDto } from './dto/create-response-form.dto';
import { UpdateResponseFormDto } from './dto/update-response-form.dto';
import { ResponseForm } from '../Schemas/response.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ResponseFormService {
  constructor(
    @InjectModel(ResponseForm.name)
    private responseFormModel: Model<ResponseForm>,
  ) {}
  async create(createResponseFormDto: CreateResponseFormDto) {
    const responseForm = await this.responseFormModel.create(
      createResponseFormDto,
    );
    return responseForm;
  }

  async findAll(req: any) {
    const responseForm = await this.responseFormModel.find({
      userId: req.user.sub,
    });
    if (responseForm.length == 0) {
      return null;
    }
    return responseForm;
  }

  async findOne(id: string) {
    const responseForm = await this.responseFormModel.findById(id);
    if (!responseForm) {
      return null;
    }
    return responseForm;
  }

  async update(id: string, updateResponseFormDto: UpdateResponseFormDto) {
    const responseForm = await this.responseFormModel.findByIdAndUpdate(
      id,
      updateResponseFormDto,
      {
        new: true,
      },
    );
    if (!responseForm) {
      return null;
    }
    return responseForm;
  }

  async remove(id: string) {
    const responseForm = await this.responseFormModel.findByIdAndDelete(id);
    if (!responseForm) {
      return null;
    }
    return responseForm;
  }
}
