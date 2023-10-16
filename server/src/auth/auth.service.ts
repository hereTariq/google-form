import { Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SignInDto } from './signInDto';
@ApiTags('login')
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.userService.findByEmail(username);
    if (user == null) {
      return new UnauthorizedException('Email is not registered');
    }

    const validPassword = await bcrypt.compare(pass, user.password);
    if (!validPassword) {
      return new UnauthorizedException('Email or password is wrong');
    }
    const payload = { username: user.email, sub: user._id };
    return {
      status: true,
      user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
