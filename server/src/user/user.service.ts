import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../Schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user = await this.findByEmail(email);
    if (user) {
      return null;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    createUserDto.password = hashedPassword;
    const newUser = await this.userModel.create(createUserDto);
    return newUser;
  }

  async findAll() {
    const users = await this.userModel.find();
    if (users.length == 0) {
      return null;
    }
    return users;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      return null;
    }
    return user;
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      return null;
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) {
      return null;
    }
    return user;
  }
}
