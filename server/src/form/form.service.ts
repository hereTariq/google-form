import { Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Form } from '../Schemas/form.schema';
import { Model } from 'mongoose';

@Injectable()
export class FormService {
  constructor(@InjectModel(Form.name) private formModel: Model<Form>) {}
  async create(createFormDto: CreateFormDto) {
    const form = await this.formModel.create(createFormDto);
    return form;
  }

  async findAll(req: any) {
    const forms = await this.formModel.find({ userId: req.user.sub });
    if (forms.length == 0) {
      return null;
    }
    return forms;
  }

  async findOne(id: string) {
    const form = await this.formModel.findById(id);
    if (!form) {
      return null;
    }
    return form;
  }

  async update(id: string, updateFormDto: UpdateFormDto) {
    const form = await this.formModel.findByIdAndUpdate(id, updateFormDto, {
      new: true,
    });
    if (!form) {
      return null;
    }
    return form;
  }

  async remove(id: string) {
    const form = await this.formModel.findByIdAndDelete(id);
    if (!form) {
      return null;
    }
    return form;
  }
}
