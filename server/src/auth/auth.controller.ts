import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './signInDto';
import {
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
@ApiTags('login')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('user/login')
  @ApiOkResponse({ description: 'login Successfully!', type: SignInDto })
  @ApiBody({ type: SignInDto })
  @ApiUnauthorizedResponse({ description: 'Invalid Credential' })
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }
}
