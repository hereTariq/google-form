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
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ResponseFormService } from './response-form.service';
import { CreateResponseFormDto } from './dto/create-response-form.dto';
import { UpdateResponseFormDto } from './dto/update-response-form.dto';
import { response } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseForm } from '../Schemas/response.schema';
@ApiTags('Response')
@Controller('response-form')
export class ResponseFormController {
  constructor(private readonly responseFormService: ResponseFormService) {}
  @UseGuards(AuthGuard)
  @Post('create')
  @ApiCreatedResponse({
    description: 'response created succesfully!',
    type: ResponseForm,
  })
  @ApiBadRequestResponse({ description: 'you cannot create.Try again!' })
  @ApiBody({ type: CreateResponseFormDto })
  @ApiBearerAuth()
  async create(
    @Body() createResponseFormDto: CreateResponseFormDto,
    @Res() response,
  ) {
    // console.log(createResponseFormDto);
    const responseForm = await this.responseFormService.create(
      createResponseFormDto,
    );
    if (!responseForm) {
      throw new HttpException(
        'Failed to create response form. Try again!',
        HttpStatus.BAD_REQUEST,
      );
    }
    response.status(HttpStatus.CREATED).json({
      status: true,
      message: 'response saved successfully',
      responseForm,
    });
  }
  @UseGuards(AuthGuard)
  @Get()
  @ApiNotFoundResponse({ description: 'No response found' })
  @ApiOkResponse({ description: 'responses fetched successfully!' })
  @ApiBearerAuth()
  async findAll(@Res() response, @Request() req) {
    const responseForms = await this.responseFormService.findAll(req);
    if (!responseForms || responseForms.length === 0) {
      throw new HttpException('No response found', HttpStatus.NOT_FOUND);
    }
    return response.status(HttpStatus.OK).json({
      status: true,
      message: 'responses fetched successfylly',
      responseForms,
    });
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiNotFoundResponse({ description: 'No response found' })
  @ApiOkResponse({ description: 'response fetched successfully!' })
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    const responseForm = await this.responseFormService.findOne(id);
    if (!responseForm) {
      throw new HttpException('response not found', HttpStatus.NOT_FOUND);
    }
    return response.status(HttpStatus.OK).json({
      status: true,
      message: 'response  fetched successfylly',
      responseForm,
    });
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiNotFoundResponse({ description: 'No response found' })
  @ApiOkResponse({ description: 'response updated successfully!' })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateResponseFormDto: UpdateResponseFormDto,
  ) {
    const responseForm = await this.responseFormService.update(
      id,
      updateResponseFormDto,
    );
    if (!responseForm) {
      throw new HttpException('response not found', HttpStatus.NOT_FOUND);
    }
    return response.status(HttpStatus.OK).json({
      status: true,
      message: 'response updated successfylly',
      responseForm,
    });
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiNotFoundResponse({ description: 'No response found' })
  @ApiOkResponse({ description: 'response deleted successfully!' })
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    const responseForm = await this.responseFormService.remove(id);
    if (!responseForm) {
      throw new HttpException('response not found', HttpStatus.NOT_FOUND);
    }
    return response.status(HttpStatus.OK).json({
      status: true,
      message: 'response deleted successfylly',
      responseForm,
    });
  }
}
