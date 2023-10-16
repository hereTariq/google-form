import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  UseGuards,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../Schemas/user.schema';
import { AuthGuard } from '../auth/auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { response } from 'express';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiCreatedResponse({ description: 'User register succesfully!', type: User })
  @ApiBadRequestResponse({ description: 'you cannot register.Try again!' })
  @ApiBody({ type: CreateUserDto })
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() response,
  ): Promise<User> {
    const user = await this.userService.create(createUserDto);
    // if some network issue or database issue
    if (user == null) {
      throw new HttpException('Email already exist', HttpStatus.BAD_REQUEST);
    }
    return response.status(HttpStatus.CREATED).json({ status: true, user });
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOkResponse({ description: 'users list' })
  @ApiNotFoundResponse({ description: 'users not found' })
  @ApiBearerAuth()
  async findAll(@Res() response): Promise<User[]> {
    const users = await this.userService.findAll();
    if (!users || users.length === 0) {
      throw new HttpException('No users found', HttpStatus.NOT_FOUND);
    }
    return response.status(HttpStatus.OK).json({
      status: true,
      message: 'users fetched successfylly',
      users,
    });
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOkResponse({ description: 'user details' })
  @ApiNotFoundResponse({ description: 'user not found' })
  @ApiBearerAuth()
  async findOne(@Param('id') id: string, @Res() response): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    return response
      .status(HttpStatus.OK)
      .json({ status: true, message: 'User fetched successfylly', user });
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOkResponse({ description: 'user details updated successfully!' })
  @ApiNotFoundResponse({ description: 'user not found' })
  @ApiBearerAuth()
  @ApiBody({ type: UpdateUserDto })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() response,
  ): Promise<User> {
    const user = await this.userService.update(id, updateUserDto);
    if (!user) {
      throw new HttpException('Failed to update user', HttpStatus.BAD_REQUEST);
    }
    return response
      .status(HttpStatus.OK)
      .json({ status: true, message: 'User updated successfylly', user });
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOkResponse({ description: 'user details deleted successfully!' })
  @ApiNotFoundResponse({ description: 'user not found' })
  @ApiBearerAuth()
  async remove(@Param('id') id: string, @Res() response): Promise<User> {
    const user = await this.userService.remove(id);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    return response
      .status(HttpStatus.OK)
      .json({ status: true, message: 'User deleted successfylly', user });
  }
}
